# -*- coding: utf-8 -*-
"""Génère deux templates Elementor (body + footer) depuis la maquette Le Brasier."""
import json, secrets

_used = set()
def uid():
    while True:
        u = secrets.token_hex(4)[:7]
        if u not in _used:
            _used.add(u); return u

# Palette
INK="#15100B"; INK2="#1C150E"; PANEL="#211810"
CREAM="#F3E8D6"; CREAM2="#E7D8C0"; MUTED="#B6A489"
EMBER="#C2511F"; EMBER2="#E07A2C"; GOLD="#C89B53"
HF="Fraunces"; BF="Archivo"

def fs(px): return {"unit":"px","size":px,"sizes":[]}
def ls(px): return {"unit":"px","size":px,"sizes":[]}
def pad(t,r,b,l): return {"unit":"px","top":str(t),"right":str(r),"bottom":str(b),"left":str(l),"isLinked":False}

def widget(wtype, settings):
    return {"id":uid(),"elType":"widget","settings":settings,"elements":[],"widgetType":wtype}

def section(settings, cols, inner=False):
    return {"id":uid(),"elType":"section","settings":settings,"elements":cols,"isInner":inner}

def column(size, els, settings=None, inner=False):
    s={"_column_size":size,"_inline_size":size}
    if settings: s.update(settings)
    return {"id":uid(),"elType":"column","settings":s,"elements":els,"isInner":inner}

# ---- widget builders ----
def heading(title, size, color, tag="h2", weight="600", font=HF, align="left",
            letter=None, transform=None, italic=None, mb=None):
    s={"title":title,"header_size":tag,"align":align,"title_color":color,
       "typography_typography":"custom","typography_font_family":font,
       "typography_font_size":fs(size),"typography_font_weight":weight}
    if letter is not None: s["typography_letter_spacing"]=ls(letter)
    if transform: s["typography_text_transform"]=transform
    if italic: s["typography_font_style"]="italic"
    if mb is not None: s["_margin"]=pad(0,0,mb,0)
    return widget("heading",s)

def textw(html, color=CREAM2, size=16, align="left", font=BF, mb=None):
    if not html.lstrip().startswith("<"): html=f"<p>{html}</p>"
    s={"editor":html,"text_color":color,"align":align,
       "typography_typography":"custom","typography_font_family":font,
       "typography_font_size":fs(size)}
    if mb is not None: s["_margin"]=pad(0,0,mb,0)
    return widget("text-editor",s)

def button(text, url="#", bg=EMBER, color="#ffffff", align="left", ghost=False):
    s={"text":text,"link":{"url":url,"is_external":"","nofollow":""},"align":align,
       "button_text_color":color,
       "typography_typography":"custom","typography_font_family":BF,
       "typography_font_weight":"600","typography_text_transform":"uppercase",
       "typography_letter_spacing":ls(2),"typography_font_size":fs(13),
       "border_radius":{"unit":"px","top":"0","right":"0","bottom":"0","left":"0","isLinked":True},
       "text_padding":pad(18,34,18,34)}
    if ghost:
        s["background_color"]="rgba(0,0,0,0)"
        s["border_border"]="solid"; s["border_width"]=pad(1,1,1,1)
        s["border_color"]="rgba(243,232,214,0.25)"
        s["button_text_color"]=CREAM
    else:
        s["background_color"]=bg
        s["button_background_hover_color"]=EMBER2
    return widget("button",s)

def image(url, alt=""):
    return widget("image",{"image":{"url":url,"id":"","alt":alt,"source":"url"},"image_size":"full"})

def iconbox(icon, lib, title, desc):
    s={"selected_icon":{"value":icon,"library":lib},"title_text":title,"description_text":desc,
       "position":"top","title_color":CREAM,"description_color":MUTED,"primary_color":EMBER2,
       "title_typography_typography":"custom","title_typography_font_family":HF,
       "title_typography_font_size":fs(23),"title_typography_font_weight":"600",
       "description_typography_typography":"custom","description_typography_font_family":BF,
       "description_typography_font_size":fs(14)}
    return widget("icon-box",s)

def iconlist(items, color=CREAM2, icon_color=EMBER2):
    lst=[]
    for txt,url in items:
        lst.append({"text":txt,"selected_icon":{"value":"fas fa-angle-right","library":"fa-solid"},
                    "link":{"url":url,"is_external":"","nofollow":""},"_id":uid()[:7]})
    s={"icon_list":lst,"icon_color":icon_color,"text_color":color,"space_between":ls(12),
       "icon_size":fs(11),
       "text_typography_typography":"custom","text_typography_font_family":BF,"text_typography_font_size":fs(15)}
    return widget("icon-list",s)

def socials():
    s={"social_icon_list":[
        {"social_icon":{"value":"fab fa-instagram","library":"fa-brands"},"link":{"url":"#"},"_id":uid()[:7]},
        {"social_icon":{"value":"fab fa-facebook-f","library":"fa-brands"},"link":{"url":"#"},"_id":uid()[:7]},
        {"social_icon":{"value":"fab fa-whatsapp","library":"fa-brands"},"link":{"url":"#"},"_id":uid()[:7]},
       ],"shape":"square","icon_color":"custom","icon_primary_color":CREAM,
       "icon_secondary_color":"rgba(0,0,0,0)","icon_size":fs(16)}
    return widget("social-icons",s)

def sec(cols, bg=None, bg_image=None, overlay=None, padding=(130,20,130,20), extra=None):
    s={"layout":"boxed","content_width":{"unit":"px","size":1180,"sizes":[]}}
    if bg: s["background_background"]="classic"; s["background_color"]=bg
    if bg_image:
        s["background_background"]="classic"
        s["background_image"]={"url":bg_image,"id":"","source":"url"}
        s["background_position"]="center center"; s["background_size"]="cover"
    if overlay:
        s["background_overlay_background"]="classic"; s["background_overlay_color"]=overlay
    s["padding"]=pad(*padding)
    if extra: s.update(extra)
    return section(s, cols)

def inner(cols, extra=None):
    return {"id":uid(),"elType":"section","settings":(extra or {}),"elements":cols,"isInner":True}
def icol(size, els, settings=None):
    s={"_column_size":size,"_inline_size":size}
    if settings: s.update(settings)
    return {"id":uid(),"elType":"column","settings":s,"elements":els,"isInner":True}

EYE = lambda t, color=EMBER2: heading(t, 12, color, tag="span", weight="600", font=BF, letter=4, transform="uppercase", mb=18)

content=[]

# ===== HERO =====
hero_col = column(100,[
    EYE("Steakhouse & Terroir — De la ferme à la braise"),
    heading("Le goût franc de la belle viande.", 84, CREAM, tag="h1", weight="600", mb=24),
    textw("Des pièces maturées sur l'os, élevées dans notre ferme, saisies au feu de bois de chêne. Une cuisine locale, bio et sans détour — pensée pour réveiller les sens.", CREAM2, 19, mb=34),
    inner([
        icol(25,[button("Réserver une table","#")]),
        icol(75,[button("Découvrir le menu","#", ghost=True)]),
    ]),
])
content.append(sec([hero_col],
    bg_image="https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=2000&q=80",
    overlay="rgba(14,9,5,0.62)", padding=(150,20,150,20)))

# ===== MARQUEE =====
content.append(sec([column(100,[
    heading("Viande maturée  ✶  Feu de bois  ✶  Terroir & ferme  ✶  100% bio  ✶  Côte de bœuf  ✶  Saveurs authentiques",
            22, "#ffffff", tag="div", weight="500", italic=True, align="center")
])], bg=EMBER, padding=(22,20,22,20)))

# ===== DISHES heading =====
content.append(sec([
    column(60,[EYE("Les signatures de la maison"), heading("Des pièces qui donnent faim.", 56, CREAM, mb=0)]),
    column(40,[textw("Chaque viande est sélectionnée à la ferme, maturée avec patience puis saisie minute. Voici les incontournables de Dorikko.", MUTED, 16)]),
], bg=INK, padding=(120,20,40,20)))

# ===== DISHES cards =====
def dish(img, tag, name, price, desc):
    return column(33,[
        image(img, name),
        heading(tag, 11, GOLD, tag="div", weight="600", font=BF, letter=2, transform="uppercase", mb=8),
        heading(name, 25, CREAM, tag="h3", mb=6),
        heading(price+" FCFA", 22, EMBER2, tag="div", italic=True, mb=10),
        textw(desc, MUTED, 14),
    ], settings={"background_background":"classic","background_color":INK2,"padding":pad(0,0,28,0)})
content.append(sec([
    dish("https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
         "Maturée 40 jours · à partager","Côte de bœuf au feu de bois","18 500",
         "Pièce d'1,2 kg pour deux, saisie sur braise de chêne, fleur de sel de Grand-Popo, beurre maître d'hôtel."),
    dish("https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=900&q=80",
         "Race locale · grillée minute","Entrecôte du terroir","9 800",
         "Persillée et fondante, accompagnée de son gratin d'igname et d'une sauce poivre vert maison."),
    dish("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
         "Spécialité Dorikko","Brochettes de la ferme","6 500",
         "Filet mariné aux épices du marché, grillé à la braise, oignons confits et piment doux."),
], bg=INK, padding=(0,20,120,20)))

# ===== STORY =====
content.append(sec([
    column(50,[
        image("https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80","Notre chef"),
        heading("Bio — Frais · Local", 14, GOLD, tag="div", italic=True, align="center", mb=0),
    ]),
    column(50,[
        EYE("Notre histoire"),
        heading("De la ferme à la braise.", 52, CREAM, mb=22),
        textw("Dorikko-Saveurs est née d'une conviction simple : une grande viande commence bien avant l'assiette. Tout part de notre ferme, où nos bêtes grandissent au rythme du terroir, nourries sans artifice.", CREAM2, 17, mb=16),
        textw("En cuisine, notre chef respecte ce travail : une maturation lente, une braise vive, des gestes précis. Rien de superflu — juste le produit, sublimé. C'est notre manière de cultiver l'authenticité, du pré au feu.", CREAM2, 17, mb=24),
        heading("Le Chef Dorikko", 32, GOLD, tag="div", italic=True, mb=4),
        heading("Fondateur & Maître du feu", 12, MUTED, tag="div", weight="500", font=BF, letter=2, transform="uppercase"),
    ], settings={"content_position":"center"}),
], bg=INK2, padding=(120,20,120,20)))

# ===== FEATURES =====
content.append(sec([
    column(25,[iconbox("fas fa-cow","fa-solid","Viande 100% ferme","Élevée chez nous, en pâturage libre. Une traçabilité totale, de l'étable à votre table.")]),
    column(25,[iconbox("fas fa-leaf","fa-solid","Produits bio","Légumes, ignames et herbes issus de cultures bio du voisinage, récoltés à maturité.")]),
    column(25,[iconbox("fas fa-utensils","fa-solid","Cuisine locale","Une carte ancrée dans le terroir, qui célèbre les saveurs et les épices de la région.")]),
    column(25,[iconbox("fas fa-handshake","fa-solid","Hospitalité","Un accueil chaleureux et sincère, parce qu'un bon repas se partage avant tout.")]),
], bg=INK, padding=(90,20,90,20)))

# ===== QUOTE BAND =====
content.append(sec([column(100,[
    heading("Venez savourer l'authenticité", 12, GOLD, tag="div", weight="600", font=BF, letter=4, transform="uppercase", align="center", mb=24),
    heading("La braise ne ment jamais. Elle révèle le vrai goût d'une viande honnête.", 48, CREAM, tag="div", italic=True, weight="400", align="center", mb=20),
    heading("— L'esprit Dorikko", 12, GOLD, tag="div", weight="600", font=BF, letter=3, transform="uppercase", align="center"),
])], bg_image="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=2000&q=80",
    overlay="rgba(14,9,5,0.72)", padding=(150,20,150,20)))

# ===== MENU heading =====
content.append(sec([
    column(60,[EYE("La carte"), heading("Le menu du feu.", 56, CREAM, mb=0)]),
    column(40,[textw("Une sélection courte et changeante, dictée par la ferme et le marché du jour.", MUTED, 16)]),
], bg=INK2, padding=(120,20,40,20)))

# ===== MENU content =====
def menu_html(cat, items):
    rows="".join(
        f'<p style="display:flex;justify-content:space-between;border-bottom:1px dotted rgba(243,232,214,.25);padding:8px 0;margin:0;">'
        f'<span><strong style="font-family:Fraunces;color:#F3E8D6;font-size:18px;">{n}</strong>'
        + (f'<br><span style="color:#B6A489;font-size:13px;">{d}</span>' if d else '')
        + f'</span><span style="font-family:Fraunces;font-style:italic;color:#C89B53;white-space:nowrap;">{p}</span></p>'
        for n,p,d in items)
    return f'<p style="font-family:Fraunces;font-style:italic;color:#E07A2C;border-bottom:1px solid rgba(243,232,214,.2);padding-bottom:8px;margin:18px 0 8px;">{cat}</p>'+rows

menu_left = column(60,[
    textw(menu_html("Les viandes à la braise",[
        ("Filet de bœuf maturé","11 500","300 g, beurre d'épices, frites de patate douce"),
        ("Côte d'agneau du pays","10 200","Marinade citron-thym, légumes grillés"),
        ("Magret fumé maison","9 400","Laque de miel local, igname rôtie"),
        ("Travers caramélisés","8 600","12 h de cuisson lente, sauce braise"),
    ]), CREAM2, 15),
    textw(menu_html("Pour accompagner",[
        ("Gratin d'igname","2 800",""),
        ("Salade du potager bio","2 400",""),
        ("Légumes au feu de bois","3 100",""),
        ("Frites maison & sauces","2 200",""),
    ]), CREAM2, 15),
])
menu_right = column(40,[
    image("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80","Viande à la braise"),
    textw("« Le menu change avec les saisons et les arrivages de la ferme. Demandez la suggestion du chef. »", MUTED, 13),
])
content.append(sec([menu_left, menu_right], bg=INK2, padding=(0,20,120,20)))

# ===== RESERVATION + HOURS =====
hours_html=('<p style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(243,232,214,.08);padding:14px 0;margin:0;">'
            '<span style="color:#F3E8D6;font-weight:600;">{d}</span>'
            '<span style="font-family:Fraunces;font-style:italic;color:#C89B53;">{t}</span></p>')
hours_block="".join(hours_html.format(d=d,t=t) for d,t in [
    ("Lundi – Jeudi","11h00 – 22h00"),("Vendredi","11h00 – 00h00"),
    ("Samedi","11h00 – 00h00"),("Dimanche","11h00 – 00h00")])
hours_col = column(50,[
    EYE("Nos horaires"),
    heading("Heures d'ouverture", 40, CREAM, mb=14),
    textw("Ouvert tous les jours, midi et soir. Réservation conseillée le week-end.", MUTED, 16, mb=20),
    textw(hours_block, CREAM2, 15),
], settings={"background_background":"classic","background_color":PANEL,"padding":pad(56,48,56,48)})
resa_col = column(50,[
    heading("Réservez votre table", 12, "#ffffff", tag="div", weight="600", font=BF, letter=4, transform="uppercase", mb=18),
    heading("Une place au coin du feu.", 44, "#ffffff", mb=16),
    textw("Réservez en quelques secondes — nous vous rappelons pour confirmer. (Ajoutez ici votre widget de formulaire Elementor.)", "rgba(255,255,255,0.88)", 16, mb=28),
    button("Réserver maintenant","#", bg=INK, color="#ffffff"),
], settings={"background_background":"classic","background_color":EMBER,"padding":pad(56,48,56,48)})
content.append(sec([hours_col, resa_col], bg=INK, padding=(120,20,120,20)))

# ===== TESTIMONIAL =====
content.append(sec([column(100,[
    heading("★★★★★", 20, GOLD, tag="div", align="center", weight="400", font=BF, letter=6, mb=20),
    heading("La meilleure côte de bœuf que j'aie mangée. On sent le travail de la ferme jusque dans l'assiette — et l'accueil est à la hauteur.",
            36, CREAM, tag="div", italic=True, weight="400", align="center", mb=24),
    heading("Awa K. — Cliente fidèle", 12, MUTED, tag="div", weight="600", font=BF, letter=3, transform="uppercase", align="center"),
])], bg=INK2, padding=(120,20,120,20)))

# ===== LABELS =====
content.append(sec([
    column(25,[iconbox("fas fa-certificate","fa-solid","IBB","Élevage certifié")]),
    column(25,[iconbox("fas fa-leaf","fa-solid","BIO","Agriculture biologique")]),
    column(25,[iconbox("fas fa-tractor","fa-solid","Ferme","Du pré à l'assiette")]),
    column(25,[iconbox("fas fa-fire","fa-solid","Feu de bois","Cuisson traditionnelle")]),
], bg=INK, padding=(60,20,60,20)))

# ===== GALLERY heading =====
content.append(sec([
    column(60,[EYE("En images"), heading("L'instant Dorikko.", 56, CREAM, mb=0)]),
    column(40,[textw('Suivez le feu, les plats et l\'ambiance de la maison sur Instagram <strong style="color:#E07A2C;">@dorikko.saveurs</strong>', MUTED, 16)]),
], bg=INK, padding=(120,20,40,20)))

# ===== GALLERY images =====
gal=["https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80",
     "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80",
     "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=500&q=80",
     "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=80",
     "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
     "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80"]
content.append(sec([column(33,[image(g)]) for g in gal], bg=INK, padding=(0,20,120,20)))

body_template={"version":"0.4","title":"Dorikko – Le Brasier (Body)","type":"page",
    "content":content,
    "page_settings":{"background_background":"classic","background_color":INK}}

# ============ FOOTER ============
footer_cols=[
    column(34,[
        heading("DORIKKO SAVEURS", 26, CREAM, tag="div", weight="600", letter=2, mb=10),
        heading("Frais · Local · Bio", 14, EMBER2, tag="div", italic=True, font=HF, mb=18),
        textw("Maison de viande & terroir à Kpalimé. Frais, local, bio — nous cultivons le goût du vrai, de la ferme à la braise.", MUTED, 14, mb=18),
        socials(),
    ]),
    column(20,[
        heading("Visiter", 12, GOLD, tag="div", weight="600", font=BF, letter=3, transform="uppercase", mb=20),
        iconlist([("Les signatures","#dishes"),("La maison","#story"),("Le menu","#menu"),("Galerie","#gallery"),("Réserver","#resa")]),
    ]),
    column(22,[
        heading("Nous trouver", 12, GOLD, tag="div", weight="600", font=BF, letter=3, transform="uppercase", mb=20),
        iconlist([("Zomayi, près de Togo Grain","#"),("Kpalimé, Togo","#"),("+228 91 69 84 29","tel:+22891698429"),("info@dorikko-saveurs.com","mailto:info@dorikko-saveurs.com")]),
    ]),
    column(24,[
        heading("La lettre du feu", 12, GOLD, tag="div", weight="600", font=BF, letter=3, transform="uppercase", mb=20),
        textw("Suggestions du chef, soirées braise et arrivages de la ferme — une fois par mois.", MUTED, 14, mb=16),
        button("S'abonner","#", bg=EMBER, color="#ffffff"),
    ]),
]
footer_main=sec(footer_cols, bg="#0D0905", padding=(90,20,40,20))
footer_bottom=sec([
    column(60,[textw("© 2026 Dorikko-Saveurs. Tous droits réservés.", MUTED, 13)]),
    column(40,[textw("Frais · Local · Bio — Cuisine au feu de bois", MUTED, 13, align="right")]),
], bg="#0D0905", padding=(24,20,24,20), extra={"border_border":"solid","border_width":pad(1,0,0,0),"border_color":"rgba(243,232,214,0.08)"})

footer_template={"version":"0.4","title":"Dorikko – Le Brasier (Footer)","type":"section",
    "content":[footer_main, footer_bottom],
    "page_settings":{"background_background":"classic","background_color":"#0D0905"}}

with open("elementor-body.json","w",encoding="utf-8") as f:
    json.dump(body_template,f,ensure_ascii=False,indent=1)
with open("elementor-footer.json","w",encoding="utf-8") as f:
    json.dump(footer_template,f,ensure_ascii=False,indent=1)

# validation
for fn in ("elementor-body.json","elementor-footer.json"):
    with open(fn,encoding="utf-8") as f: d=json.load(f)
    print(fn, "OK · type=",d["type"],"· sections=",len(d["content"]))
print("body widgets:", sum(1 for _ in json.dumps(body_template).split('"widgetType"'))-1)
