"""Render a fixed selection of checked original VR questions, exported by the companion script."""
from pathlib import Path
from html import escape
import json
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
GROUPS = json.loads((ROOT / 'tmp/pdfs/verbal-starter.json').read_text())
GREEN = colors.HexColor('#153f35')
INK = colors.HexColor('#233b34')
MUTED = colors.HexColor('#58645d')
RULE = colors.HexColor('#d7ded7')
for name, filename in [('Body', 'DejaVuSans.ttf'), ('Bold', 'DejaVuSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, '/usr/share/fonts/truetype/dejavu/' + filename))

BODY = ParagraphStyle('body', fontName='Body', fontSize=10, leading=15, textColor=INK, spaceAfter=9)
SMALL = ParagraphStyle('small', parent=BODY, fontSize=8.5, leading=12, textColor=MUTED)
TITLE = ParagraphStyle('title', fontName='Bold', fontSize=23, leading=29, textColor=GREEN, spaceAfter=16)
HEADING = ParagraphStyle('heading', fontName='Bold', fontSize=14, leading=20, textColor=GREEN, spaceBefore=15, spaceAfter=12, keepWithNext=True)
QUESTION = ParagraphStyle('question', parent=BODY, fontName='Bold', spaceAfter=10)

def plain(value):
    return str(value).replace('–', '-').replace('—', '-').replace('−', '-').replace('\u2011', '-')

def paragraph(value, style=BODY):
    return Paragraph(escape(plain(value)), style)

def page(canvas, document):
    canvas.saveState()
    width, height = document.pagesize
    canvas.setFillColor(GREEN)
    canvas.setFont('Bold', 10)
    canvas.drawString(44, height - 33, '11 PLUS EXAM PAPERS')
    canvas.setFillColor(MUTED)
    canvas.setFont('Body', 8)
    canvas.drawRightString(width - 44, height - 33, document.booklet_label)
    canvas.setStrokeColor(RULE)
    canvas.line(44, height - 44, width - 44, height - 44)
    canvas.line(44, 43, width - 44, 43)
    canvas.setFont('Body', 7.5)
    canvas.drawString(44, 29, 'Original starter practice | 2 November 2026 | 11plusexampapers.com')
    canvas.drawRightString(width - 44, 29, str(document.page))
    canvas.restoreState()

for answers in [False, True]:
    path = ROOT / 'public/papers' / ('verbal-worked-answers.pdf' if answers else 'verbal-practice.pdf')
    document = SimpleDocTemplate(str(path), pagesize=(595.276, 841.89), leftMargin=44, rightMargin=44, topMargin=65, bottomMargin=63, title='11+ Verbal Reasoning Starter: ' + ('Worked Answers' if answers else 'Questions'), author='11 Plus Exam Papers')
    document.booklet_label = 'WORKED ANSWERS' if answers else 'QUESTION BOOKLET'
    story = [
        paragraph('Verbal reasoning: starter ' + ('worked answers' if answers else 'practice'), TITLE),
        paragraph('12 original questions: three each on letter codes, word analogies, classifications and constant-step sequences.'),
        paragraph('For families preparing for tests taken in 2027. This selected-skill set is not an official past paper or a complete verbal-reasoning syllabus.'),
        paragraph('Start untimed. ' + ('Check the relationship or rule as well as the answer. The option letters match the separate question booklet.' if answers else 'Choose one answer from A-D, and show or explain your rule. Keep the separate worked answers closed until you finish.')),
        paragraph('Find both booklets, methods and online practice at www.11plusexampapers.com/papers', SMALL),
    ]
    if not answers:
        story.extend([paragraph('Name: ________________________    Date: __________________'), Spacer(1, 5)])
    number = 0
    for group in GROUPS:
        for group_index, question in enumerate(group['questions']):
            number += 1
            block = [paragraph(group['title'], HEADING)] if group_index == 0 else []
            block.append(paragraph(f'{number}. {question["text"]}', QUESTION))
            if answers:
                option = 'ABCD'[question['options'].index(question['correctAnswer'])]
                block.append(paragraph(f'Answer: {option} - {question["correctAnswer"]}'))
                block.append(paragraph(question['explanation']))
            else:
                choices = [paragraph(f'{"ABCD"[index]}. {value}') for index, value in enumerate(question['options'])]
                table = Table([choices[:2], choices[2:]], colWidths=[250, 250], hAlign='LEFT')
                table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 12), ('TOPPADDING', (0, 0), (-1, -1), 2), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))
                block.extend([table, paragraph('My answer: ______     My rule / working:', SMALL), Spacer(1, 18)])
            block.append(Spacer(1, 9))
            story.append(KeepTogether(block))
    story.extend([Spacer(1, 12), paragraph('Next step: review a missed skill at www.11plusexampapers.com/subjects/verbal-reasoning. Original questions and explanations © 2026 11 Plus Exam Papers.', SMALL)])
    document.build(story, onFirstPage=page, onLaterPages=page)
print('Rendered the verbal question and worked-answer booklets.')
