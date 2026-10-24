"""Build original topic-practice PDFs from tmp/pdfs/source.json (exported from checked TS guides)."""
from pathlib import Path
import json,re,html
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT

ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'tmp/pdfs/source.json').read_text())
for n,f in [('Body','DejaVuSans.ttf'),('Bold','DejaVuSans-Bold.ttf')]:
 pdfmetrics.registerFont(TTFont(n,'/usr/share/fonts/truetype/dejavu/'+f))
W,H=595.276,841.89
GREEN=HexColor('#153f35'); INK=HexColor('#233b34'); MUTED=HexColor('#58645d'); GOLD=HexColor('#bb934f')
style=ParagraphStyle('body',fontName='Body',fontSize=10.5,leading=16,textColor=INK)
small=ParagraphStyle('small',parent=style,fontSize=8.5,leading=13,textColor=MUTED)
class Book:
 def __init__(self,path,title,label):
  self.c=canvas.Canvas(str(path),pagesize=(W,H));self.c.setTitle(title);self.c.setAuthor('11 Plus Exam Papers');self.title=title;self.label=label;self.page=0;self.new()
 def new(self):
  if self.page:self.footer();self.c.showPage()
  self.page+=1;self.y=755
  self.c.setFillColor(GREEN);self.c.rect(0,H-61,W,61,fill=1,stroke=0)
  self.c.setFillColor(HexColor('#ffffff'));self.c.setFont('Bold',12);self.c.drawString(44,H-29,'11 PLUS EXAM PAPERS')
  self.c.setFont('Body',8);self.c.drawRightString(W-44,H-29,self.label)
 def footer(self):
  self.c.setStrokeColor(HexColor('#d7ded7'));self.c.line(44,48,W-44,48)
  self.c.setFillColor(MUTED);self.c.setFont('Body',8);self.c.drawString(44,33,'Original skill practice | 24 October 2026 | 11plusexampapers.com');self.c.drawRightString(W-44,33,str(self.page))
 def p(self,text,kind=style,gap=10):
  text=re.sub(r'\[([^]]+)\]\(([^)]+)\)',r'\1 (\2)',text)
  text=text.replace('–','-').replace('—','-').replace('\u2011','-')
  p=Paragraph(html.escape(text),kind);_,h=p.wrap(W-88,700)
  if self.y-h<66:self.new()
  p.drawOn(self.c,44,self.y-h);self.y-=h+gap
 def heading(self,text):
  self.p(text,ParagraphStyle('h',fontName='Bold',fontSize=15,leading=21,textColor=GREEN),14)
 def titleblock(self):
  self.p(self.title,ParagraphStyle('title',fontName='Bold',fontSize=24,leading=30,textColor=GREEN),18)
 def lines(self,n=3):
  for _ in range(n):
   self.c.setStrokeColor(HexColor('#dde3dc'));self.c.line(44,self.y-15,W-44,self.y-15);self.y-=25
 def save(self):self.footer();self.c.save()

out=ROOT/'public/papers';out.mkdir(exist_ok=True)
for subject,title in [('maths','Maths foundations'),('english','English punctuation')]:
 groups=data[subject]
 for answers in [False,True]:
  suffix='worked-answers' if answers else 'practice'
  b=Book(out/f'{subject}-{suffix}.pdf',f'{title}: '+('worked answers' if answers else 'practice set'),'WORKED ANSWERS' if answers else 'QUESTION BOOKLET')
  b.titleblock();b.p(('20' if subject=='maths' else '16')+' original questions for 11 Plus skill preparation. Supports families preparing for tests taken in 2027; not an official paper, past paper or school-specific mock.')
  b.p('Scope: '+('order of operations; factors, multiples and primes; negative numbers; percentage change.' if subject=='maths' else 'apostrophes and direct-speech punctuation. This set does not assess the full English syllabus.'))
  b.p('Use untimed first. '+('Check the method as well as the final answer. Return to the linked guide for teaching and further questions.' if answers else 'Work on paper, show your reasoning, and keep the separate answer booklet closed until you finish. No official test duration or predicted admissions score applies.'))
  b.p('Find both booklets and online practice: https://www.11plusexampapers.com/papers',small)
  b.p('The questions are selected from our existing original guides, not newly commissioned official exam material. © 2026 11 Plus Exam Papers.',small)
  if not answers:b.p('Name: __________________________    Date: __________________')
  number=0
  for group in groups:
   b.new();b.heading(group['title'].replace('11+ ', '').split(':')[0])
   if subject=='english' and 'apostrophes' in group['slug']:
    b.p('Passage for question 6:');b.p(data['passage']);b.p('Context: several artists and children are involved; there is one curator.',small)
   for q in group['questions']:
    number+=1
    text=re.sub(r'^\d+\.\s*','',q['text'])
    if answers:
     total=18
     for part in [f'{number}. {text}', 'Answer: '+q['answer'], 'Why: '+q['explanation']]:
      para=Paragraph(html.escape(part),style);total+=para.wrap(W-88,700)[1]+10
     if b.y-total<66:b.new()
     b.p(f'{number}. {text}',ParagraphStyle('q',parent=style,fontName='Bold'),5)
     b.p('Answer: '+q['answer'],gap=5);b.p('Why: '+q['explanation'],gap=18)
    else:
     # Keep each question and its working area on one page.
     p=Paragraph(html.escape(f'{number}. {text}'),style);_,height=p.wrap(W-88,700)
     if b.y-height-90<66:b.new()
     b.p(f'{number}. {text}',gap=2);b.lines(3);b.y-=12
   b.p('Source guide: https://www.11plusexampapers.com/blog/'+group['slug'],small)
  b.save()
print('Built four original question/answer PDFs')
