"""
Generate the branded FSMA 204 readiness checklist PDF (public/provarx-fsma-204-checklist.pdf).
This is the ungated lead magnet linked in cold-email outreach and from the deadline tracker.

Run with:  python scripts/gen_checklist_pdf.py
Requires:  reportlab  (pip install reportlab)
"""

import os
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table,
    TableStyle, Flowable, KeepTogether,
)

NAVY = HexColor("#0A2540")
NAVY2 = HexColor("#13294B")
TEAL = HexColor("#00C9A7")
SLATE = HexColor("#64748B")
LIGHT = HexColor("#EFF6FF")
BORDER = HexColor("#E5E7EB")

CALENDAR = "calendar.app.google/agEvxXjDA1SavteP6"
SITE = "getprovarx.com"

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "public", "provarx-fsma-204-checklist.pdf")

# ---- Content (mirrors the on-site tools so the PDF and site stay consistent) ----
QUESTIONS = [
    "Do you maintain a written food traceability plan that identifies all Critical Tracking Events (CTEs) and Key Data Elements (KDEs)?",
    "Can you produce a complete lot-level traceability report within 24 hours of an FDA request?",
    "Are your batch records stored in a tamper-evident system — not paper or standard spreadsheets?",
    "Do you have documented procedures for tracing an ingredient from receiving through finished product and into distribution?",
    "Can you identify every customer who received product from a specific lot number within 2 hours?",
    "Do your batch records capture all FSMA 204 KDEs: lot code, location, quantity, unit of measure, and reference document number?",
    "Are your Critical Control Points (CCPs) monitored digitally with automatic time-stamping?",
    "Do you have a written recall plan that has been tested in the last 12 months?",
    "Are your suppliers providing FSMA 204-compliant traceability records that you can link to your own?",
    "Does your QA team have real-time visibility into production records without being physically on the floor?",
]

CHECKLIST = [
    "Written food traceability plan documented",
    "All Critical Tracking Events (CTEs) identified for your food categories",
    "All Key Data Elements (KDEs) defined for each CTE",
    "Records system selected and configured",
    "Staff trained on KDE capture procedures",
    "Supplier traceability requirements communicated",
    "Records format tested for FDA-readability",
    "24-hour recall drill completed",
    "Internal audit of records completeness done",
    "Mock FDA records request completed",
    "Customer notification procedures documented",
    "Legal review of traceability plan completed",
]

CTES = [
    ("Growing", "Harvesting/gathering food (primarily farms)."),
    ("Receiving", "A covered food arrives at your facility from a supplier."),
    ("Transforming", "A covered food changes form — cooking, blending, grinding, cutting."),
    ("Creating", "Producing a new food from ingredients, including covered ingredients."),
    ("Shipping", "A covered food leaves your custody for the next recipient."),
]

KDES = [
    "Traceability lot code (TLC)",
    "Quantity and unit of measure",
    "Location description",
    "Date of the Critical Tracking Event",
    "Reference document type and number",
]

# ---- Styles ----
styles = {
    "h1": ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=22, leading=26, textColor=NAVY, spaceAfter=4),
    "sub": ParagraphStyle("sub", fontName="Helvetica", fontSize=10.5, leading=14, textColor=SLATE, spaceAfter=2),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=13.5, leading=17, textColor=NAVY, spaceBefore=18, spaceAfter=6),
    "intro": ParagraphStyle("intro", fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=SLATE, spaceAfter=8),
    "item": ParagraphStyle("item", fontName="Helvetica", fontSize=10, leading=13.5, textColor=NAVY),
    "ctaH": ParagraphStyle("ctaH", fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=white),
    "ctaP": ParagraphStyle("ctaP", fontName="Helvetica", fontSize=9.5, leading=14, textColor=HexColor("#C7D2E0")),
    "ctaLink": ParagraphStyle("ctaLink", fontName="Helvetica-Bold", fontSize=10, leading=15, textColor=TEAL),
    "calloutLabel": ParagraphStyle("cl", fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=TEAL),
    "calloutBig": ParagraphStyle("cb", fontName="Helvetica-Bold", fontSize=17, leading=20, textColor=white),
    "calloutP": ParagraphStyle("cp", fontName="Helvetica", fontSize=9, leading=13, textColor=HexColor("#C7D2E0")),
    "kde": ParagraphStyle("kde", fontName="Helvetica", fontSize=10, leading=14, textColor=NAVY),
    "cteName": ParagraphStyle("cten", fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=NAVY),
    "cteDesc": ParagraphStyle("cted", fontName="Helvetica", fontSize=9, leading=12, textColor=SLATE),
}


class CheckBox(Flowable):
    def __init__(self, size=11):
        super().__init__()
        self.size = size
        self.width = size
        self.height = size

    def draw(self):
        self.canv.setStrokeColor(TEAL)
        self.canv.setLineWidth(1.3)
        self.canv.roundRect(0, 1, self.size, self.size, 2.2, stroke=1, fill=0)


def numbered_checkbox_table(items, numbered=True):
    rows = []
    for i, text in enumerate(items, 1):
        label = f"<b>{i}.</b> {text}" if numbered else text
        rows.append([CheckBox(), Paragraph(label, styles["item"])])
    t = Table(rows, colWidths=[0.32 * inch, 6.1 * inch])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LINEBELOW", (0, 0), (-1, -2), 0.5, BORDER),
        ("LEFTPADDING", (1, 0), (1, -1), 8),
    ]))
    return t


def deadline_callout():
    inner = [
        [Paragraph("COMPLIANCE DEADLINE", styles["calloutLabel"])],
        [Paragraph("July 20, 2028", styles["calloutBig"])],
        [Paragraph(
            "FDA extended the FSMA 204 compliance date by 30 months (from January 20, 2026), "
            "and Congress directed no enforcement before this date. It applies uniformly to all "
            "covered businesses, regardless of size.",
            styles["calloutP"])],
    ]
    t = Table(inner, colWidths=[6.42 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 18),
        ("RIGHTPADDING", (0, 0), (-1, -1), 18),
        ("TOPPADDING", (0, 0), (0, 0), 14),
        ("BOTTOMPADDING", (0, -1), (0, -1), 14),
        ("TOPPADDING", (0, 1), (0, 2), 2),
        ("LINEBEFORE", (0, 0), (0, -1), 4, TEAL),
        ("ROUNDEDCORNERS", [6, 6, 6, 6]),
    ]))
    return t


def cte_table():
    rows = [[Paragraph(name, styles["cteName"]), Paragraph(desc, styles["cteDesc"])] for name, desc in CTES]
    t = Table(rows, colWidths=[1.25 * inch, 5.17 * inch])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LINEBELOW", (0, 0), (-1, -2), 0.5, BORDER),
    ]))
    return t


def kde_table():
    rows = []
    for i, text in enumerate(KDES, 1):
        rows.append([CheckBox(), Paragraph(text, styles["kde"])])
    t = Table(rows, colWidths=[0.32 * inch, 6.1 * inch])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (1, 0), (1, -1), 8),
    ]))
    return t


def cta_block():
    inner = [
        [Paragraph("Find your gaps in 5 minutes — free", styles["ctaH"])],
        [Paragraph(
            "Score your facility across all 10 readiness dimensions and get a prioritized gap report.",
            styles["ctaP"])],
        [Paragraph(f"Take the free assessment &raquo;&nbsp;&nbsp;{SITE}/tools/fsma-gap-assessment", styles["ctaLink"])],
        [Paragraph(f"Talk to a compliance expert &raquo;&nbsp;&nbsp;{CALENDAR}", styles["ctaLink"])],
    ]
    t = Table(inner, colWidths=[6.42 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY2),
        ("LEFTPADDING", (0, 0), (-1, -1), 18),
        ("RIGHTPADDING", (0, 0), (-1, -1), 18),
        ("TOPPADDING", (0, 0), (0, 0), 14),
        ("BOTTOMPADDING", (0, -1), (0, -1), 14),
        ("TOPPADDING", (0, 1), (0, -1), 3),
        ("ROUNDEDCORNERS", [6, 6, 6, 6]),
    ]))
    return t


def header_footer(canvas, doc):
    canvas.saveState()
    w, h = LETTER
    # top band
    canvas.setFillColor(NAVY)
    canvas.rect(0, h - 0.55 * inch, w, 0.55 * inch, stroke=0, fill=1)
    canvas.setFillColor(TEAL)
    canvas.rect(0, h - 0.58 * inch, w, 0.03 * inch, stroke=0, fill=1)
    canvas.setFillColor(white)
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawString(0.75 * inch, h - 0.37 * inch, "PROVARX")
    canvas.setFillColor(HexColor("#9FB3C8"))
    canvas.setFont("Helvetica", 8.5)
    canvas.drawRightString(w - 0.75 * inch, h - 0.37 * inch, "FSMA 204 Readiness Checklist")
    # footer
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(0.75 * inch, 0.6 * inch, w - 0.75 * inch, 0.6 * inch)
    canvas.setFillColor(SLATE)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(0.75 * inch, 0.42 * inch, f"{SITE}  ·  Tamper-proof compliance & process intelligence for food & beverage manufacturers")
    canvas.drawRightString(w - 0.75 * inch, 0.42 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build():
    doc = BaseDocTemplate(
        OUT, pagesize=LETTER,
        leftMargin=0.75 * inch, rightMargin=0.75 * inch,
        topMargin=0.95 * inch, bottomMargin=0.85 * inch,
        title="FSMA 204 Readiness Checklist", author="Provarx",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="all", frames=[frame], onPage=header_footer)])

    story = []
    story.append(Paragraph("FSMA 204 Readiness Checklist", styles["h1"]))
    story.append(Paragraph("Food Traceability Rule &middot; 21 CFR Part 1, Subpart S", styles["sub"]))
    story.append(Spacer(1, 12))
    story.append(deadline_callout())

    story.append(Paragraph("10-Point Readiness Self-Assessment", styles["h2"]))
    story.append(Paragraph(
        "Answer honestly. Every &ldquo;no&rdquo; is a gap that exposes your facility to FDA enforcement. "
        "Score it instantly online at the link on the last page.", styles["intro"]))
    story.append(numbered_checkbox_table(QUESTIONS, numbered=True))

    story.append(Paragraph("12-Step Implementation Checklist", styles["h2"]))
    story.append(Paragraph(
        "The path from where most facilities are today to audit-ready, lot-level traceability.",
        styles["intro"]))
    story.append(numbered_checkbox_table(CHECKLIST, numbered=True))

    story.append(Paragraph("Quick Reference: CTEs &amp; KDEs", styles["h2"]))
    story.append(Paragraph(
        "<b>Critical Tracking Events (CTEs)</b> — the points where you must capture records. "
        "Distributors also own Receiving and Shipping CTEs.", styles["intro"]))
    story.append(cte_table())
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "<b>The 5 universal Key Data Elements (KDEs)</b> — required at every CTE, linked to the lot code:",
        styles["intro"]))
    story.append(kde_table())

    story.append(Spacer(1, 18))
    story.append(KeepTogether(cta_block()))

    doc.build(story)
    print("wrote", os.path.normpath(OUT))


if __name__ == "__main__":
    build()
