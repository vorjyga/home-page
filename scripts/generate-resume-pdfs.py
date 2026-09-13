"""Generate the two downloadable CVs from the same data as the website.
Requires Python 3 + reportlab and Node.js. Run from any directory.
"""
import json
from pathlib import Path
import subprocess
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'public' / 'pdf'
OUTPUT.mkdir(parents=True, exist_ok=True)
data = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    "import {frontendResume,fullstackResume} from './src/data/resumes.js'; console.log(JSON.stringify({frontend:frontendResume,fullstack:fullstackResume}));"
], cwd=ROOT, text=True))
INK = colors.HexColor('#20394b')
MUTED = colors.HexColor('#61717c')
styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=27, leading=32, textColor=INK, spaceAfter=8),
    'role': ParagraphStyle('role', fontName='Helvetica', fontSize=13, leading=18, textColor=MUTED, spaceAfter=12),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9.5, leading=14, textColor=INK, spaceAfter=8),
    'small': ParagraphStyle('small', fontName='Helvetica', fontSize=8.5, leading=12, textColor=MUTED, spaceAfter=7),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=12, leading=17, textColor=INK, spaceBefore=15, spaceAfter=10, keepWithNext=True),
    'job': ParagraphStyle('job', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=INK, spaceBefore=12, spaceAfter=5, keepWithNext=True),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=9.5, leading=14, textColor=INK, leftIndent=10, firstLineIndent=-8, spaceAfter=6),
}
def clean(text):
    for a,b in [('—','-'),('–','-'),('→','to'),('’',"'"),('“','"'),('”','"'),('\u2011','-')]:
        text=text.replace(a,b)
    return escape(text)
def para(text, style='body'):
    return Paragraph(text, styles[style])
def section(text):
    return para(clean(text).upper(), 'section')
def job_flow(job):
    result = [para(clean(job['company']), 'job'), para(clean(job['position'])+'<br/>'+clean(job['dates']), 'small')]
    if job.get('site'):
        result.append(para(f'<link href="https://{escape(job["site"])}">{clean(job["site"])}</link>', 'small'))
    for field in ['project','summary']:
        if job.get(field): result.append(para(clean(job[field])))
    result.extend(para('- '+clean(item), 'bullet') for item in job['items'])
    return result

def generate(kind, resume):
    target = OUTPUT / f'pavel-novaikin-{kind}.pdf'
    doc = SimpleDocTemplate(str(target), pagesize=A4, rightMargin=44, leftMargin=44, topMargin=40, bottomMargin=42,
        title=f'Pavel Novaikin - {resume["profile"]["title"]}', author='Pavel Novaikin')
    story = [para(clean(resume['profile']['name']), 'name'), para(clean(resume['profile']['title'])+' | '+clean(resume['profile']['location']), 'role')]
    links = [f'<link href="{escape(c["href"], {chr(34): "&quot;"})}">{clean(c["label"])}</link>' for c in resume['contacts']]
    story += [para(' · '.join(links), 'small'), section('Profile')]
    for item in resume['summary']:
        text = clean(item) if isinstance(item, str) else ''.join('<b>'+clean(s['text'])+'</b>' if s.get('strong') else clean(s['text']) for s in item)
        story.append(para(text))
    story.append(section('Technical skills'))
    for skill in resume['skills']:
        story.append(para('<b>'+clean(skill['area'])+'</b>  '+clean(', '.join(skill['items'])), 'small'))
    story.append(section('Education & languages'))
    ed=resume['education']
    story += [para('<b>'+clean(ed['company'])+'</b><br/>'+clean(ed['dates']+' | '+ed['description']), 'small'), para(' · '.join(clean(x['lang']+' '+x['level']) for x in resume['languages']['items']), 'small')]
    story += [PageBreak(), section('Work experience')]
    for job in resume['experience'][:2]: story.extend(job_flow(job))
    story += [PageBreak(), section('Work experience / continued')]
    for job in resume['experience'][2:]: story.extend(job_flow(job))
    early=resume['earlierExperience']
    story += [Spacer(1,8), para('<b>'+clean(early['label'])+'</b> '+clean(early['period']+' '+early['text']), 'small')]
    def footer(canvas, doc):
        canvas.setStrokeColor(colors.HexColor('#dbe1e5'))
        canvas.line(44, 30, A4[0]-44, 30)
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(MUTED)
        canvas.drawString(44, 18, 'Pavel Novaikin | '+kind.capitalize()+' CV')
        canvas.drawRightString(A4[0]-44, 18, str(doc.page))
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(target.relative_to(ROOT))

for kind, resume in data.items(): generate(kind, resume)
