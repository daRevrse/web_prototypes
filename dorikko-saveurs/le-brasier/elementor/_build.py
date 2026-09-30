# -*- coding: utf-8 -*-
"""
Génère les templates Elementor (Pro) du site « Le Brasier » :
  header.json, footer.json, accueil-body.json, la-maison-body.json,
  le-menu-body.json, galerie-body.json, contact-body.json
Widgets Pro utilisés : form, price-list, nav-menu, counter.
Responsivité : tailles de police + paddings + colonnes (desktop/tablet/mobile).
Animations : entrée native Elementor (_animation = fadeInUp...).
"""
import json, secrets

_used=set()
def uid():
    while True:
        u=secrets.token_hex(4)[:7]
        if u not in _used:
            _used.add(u); return u

# ---- Palette / fonts ----
INK="#15100b"; INK2="#1c150e"; INK3="#241a11"; PANEL="#211810"
CREAM="#f3e8d6"; CREAM2="#e7d8c0"; MUTED="#b6a489"
EMBER="#c2511f"; EMBER2="#e07a2c"; GOLD="#c89b53"
DARK="#0d0905"
HF="Belgiano Serif"; BF="Fira Sans"; AF="Fraunces"  # titres / corps / accent italique

def T(px,unit="px"): return {"unit":unit,"size":px,"sizes":[]}
def pad(t,r,b,l): return {"unit":"px","top":str(t),"right":str(r),"bottom":str(b),"left":str(l),"isLinked":False}
def setresp(s,key,d,t=None,m=None,maker=T):
    s[key]=maker(d)
    if t is not None: s[key+"_tablet"]=maker(t)
    if m is not None: s[key+"_mobile"]=maker(m)

def widget(wt,s): return {"id":uid(),"elType":"widget","settings":s,"elements":[],"widgetType":wt}

def section(s,cols,inner=False): return {"id":uid(),"elType":"section","settings":s,"elements":cols,"isInner":inner}

# ---------- builders de base ----------
def heading(title,size,color,tag="h2",weight="600",font=None,align=None,letter=None,
            transform=None,italic=False,mb=None,size_t=None,size_m=None,align_m=None):
    if font is None: font = AF if italic else HF  # accents italiques -> Fraunces, titres -> Belgiano
    s={"title":title,"header_size":tag,"title_color":color,
       "typography_typography":"custom","typography_font_family":font,"typography_font_weight":weight}
    setresp(s,"typography_font_size",size,size_t,size_m)
    if align: s["align"]=align
    if align_m: s["align_mobile"]=align_m
    if letter is not None: s["typography_letter_spacing"]=T(letter)
    if transform: s["typography_text_transform"]=transform
    if italic: s["typography_font_style"]="italic"
    if mb is not None: s["_margin"]=pad(0,0,mb,0)
    return widget("heading",s)

def textw(html,color=CREAM2,size=16,align=None,font=BF,mb=None,size_m=None,lh=None):
    if not html.lstrip().startswith("<"): html=f"<p>{html}</p>"
    s={"editor":html,"text_color":color,"typography_typography":"custom",
       "typography_font_family":font}
    setresp(s,"typography_font_size",size,None,size_m)
    if lh: s["typography_line_height"]=T(lh,"em")
    if align: s["align"]=align
    if mb is not None: s["_margin"]=pad(0,0,mb,0)
    return widget("text-editor",s)

def button(text,url="#",bg=EMBER,color="#ffffff",align=None,ghost=False,hover_bg=EMBER2,dark=False):
    s={"text":text,"link":{"url":url,"is_external":"","nofollow":""},
       "typography_typography":"custom","typography_font_family":BF,"typography_font_weight":"600",
       "typography_text_transform":"uppercase","typography_letter_spacing":T(2),"typography_font_size":T(13),
       "border_radius":{"unit":"px","top":"0","right":"0","bottom":"0","left":"0","isLinked":True},
       "text_padding":pad(18,34,18,34),"button_text_color":color,"hover_color":color}
    if align: s["align"]=align
    if ghost:
        s["background_color"]="rgba(0,0,0,0)"; s["border_border"]="solid"
        s["border_width"]=pad(1,1,1,1); s["border_color"]="rgba(243,232,214,.25)"
        s["button_text_color"]=CREAM; s["button_background_hover_color"]=EMBER
        s["hover_color"]="#ffffff"
    else:
        s["background_color"]=(INK if dark else bg); s["button_background_hover_color"]=("#000000" if dark else hover_bg)
    return widget("button",s)

def image(url,alt="",ratio=None):
    s={"image":{"url":url,"id":"","alt":alt,"source":"url"},"image_size":"full"}
    return widget("image",s)

def iconbox(icon,lib,title,desc,num=None):
    # icône ronde (framed) à gauche + texte à droite — structure de l'exemple
    s={"selected_icon":{"value":icon,"library":lib},"title_text":title,"description_text":desc,
       "position":"left","view":"framed","shape":"circle","primary_color":EMBER2,
       "icon_size":{"unit":"px","size":26,"sizes":[]},"icon_padding":{"unit":"px","size":20,"sizes":[]},
       "title_color":CREAM,"description_color":MUTED,
       "icon_space":{"unit":"px","size":24,"sizes":[]},
       "title_typography_typography":"custom","title_typography_font_family":HF,
       "title_typography_font_size":T(24),"title_typography_font_weight":"600",
       "description_typography_typography":"custom","description_typography_font_family":BF,
       "description_typography_font_size":T(14)}
    return widget("icon-box",s)

def counter(end,suffix,title,prefix=""):
    s={"starting_number":0,"ending_number":end,"prefix":prefix,"suffix":suffix,"title":title,
       "thousand_separator":"","number_color":EMBER2,"title_color":MUTED,
       "typography_typography":"custom","typography_font_family":HF,"typography_font_style":"italic",
       "typography_font_size":T(54),"typography_font_weight":"500",
       "title_typography_typography":"custom","title_typography_font_family":BF,
       "title_typography_font_size":T(12),"title_typography_letter_spacing":T(2),
       "title_typography_text_transform":"uppercase","_padding":pad(40,20,40,20),
       "title_color_title":MUTED}
    return widget("counter",s)

def socials():
    s={"social_icon_list":[
        {"social_icon":{"value":"fab fa-instagram","library":"fa-brands"},"link":{"url":"#"},"_id":uid()[:7]},
        {"social_icon":{"value":"fab fa-facebook-f","library":"fa-brands"},"link":{"url":"#"},"_id":uid()[:7]},
        {"social_icon":{"value":"fab fa-whatsapp","library":"fa-brands"},"link":{"url":"#"},"_id":uid()[:7]}],
       "shape":"square","icon_color":"custom","icon_primary_color":CREAM,
       "icon_secondary_color":"rgba(0,0,0,0)","icon_size":T(16),
       "border_border":"solid","border_width":pad(1,1,1,1),"border_color":"rgba(243,232,214,.14)",
       "icon_padding":{"unit":"px","size":12,"sizes":[]}}
    return widget("social-icons",s)

def iconlist(items,color=CREAM2,icon_color=EMBER2):
    lst=[]
    for txt,url in items:
        lst.append({"text":txt,"selected_icon":{"value":"fas fa-angle-right","library":"fa-solid"},
                    "link":{"url":url,"is_external":"","nofollow":""},"_id":uid()[:7]})
    s={"icon_list":lst,"icon_color":icon_color,"text_color":color,"space_between":T(12),"icon_size":T(11),
       "text_indent":T(8),
       "text_typography_typography":"custom","text_typography_font_family":BF,"text_typography_font_size":T(15)}
    return widget("icon-list",s)

def html_widget(html):
    return widget("html",{"html":html})

# ---- Pro : formulaire ----
AUTOREP=("Votre réservation chez Dorikko-Saveurs",
         "Bonjour,\n\nMerci pour votre demande de réservation. Nous vous rappelons très vite pour confirmer votre table.\n\nÀ très bientôt,\nDorikko-Saveurs — Kpalimé\n+228 91 69 84 29")
def form(title,fields,button_text,email_to="info@dorikko-saveurs.com",subject="Site Dorikko — nouveau message",
         recaptcha=True,autoresponse=True,redirect="/merci/"):
    ff=[]
    for f in fields:
        item={"_id":uid()[:7],"field_type":f["type"],"field_label":f["label"],
              "placeholder":f.get("ph",""),"width":f.get("w","100")}
        if f.get("id"): item["custom_id"]=f["id"]
        if f.get("req"): item["required"]="true"
        if f.get("options"): item["field_options"]="\n".join(f["options"])
        if f["type"]=="textarea": item["rows"]=4
        ff.append(item)
    if recaptcha:
        ff.append({"_id":uid()[:7],"field_type":"recaptcha_v3","field_label":"reCAPTCHA",
                   "custom_id":"recaptcha_v3","width":"100","recaptcha_v3_badge":"inline","recaptcha_v3_threshold":"0.5"})
    actions=["email"]
    s={"form_name":title,"form_fields":ff,"button_text":button_text,
       "email_to":email_to,"email_subject":subject,
       "email_content":"[all-fields]","email_from_name":"Site Dorikko-Saveurs",
       "email_reply_to":'[field id="email"]',"button_width":"100","button_size":"md","button_align":"stretch",
       # styles
       "label_color":MUTED,"label_typography_typography":"custom","label_typography_font_family":BF,
       "label_typography_font_size":T(11),"label_typography_letter_spacing":T(1.5),
       "label_typography_text_transform":"uppercase",
       "field_background_color":INK2,"field_text_color":CREAM,"field_border_color":"rgba(243,232,214,.14)",
       "field_border_width":pad(1,1,1,1),"field_typography_typography":"custom","field_typography_font_family":BF,
       "field_typography_font_size":T(15),"field_padding":pad(14,15,14,15),
       "button_background_color":EMBER,"button_text_color":"#ffffff","button_hover_background_color":EMBER2,
       "button_typography_typography":"custom","button_typography_font_family":BF,"button_typography_font_weight":"600",
       "button_typography_text_transform":"uppercase","button_typography_letter_spacing":T(2),
       "button_typography_font_size":T(13),"button_border_radius":{"unit":"px","top":"0","right":"0","bottom":"0","left":"0","isLinked":True},
       "button_text_padding":pad(17,30,17,30),"mark_required_color":EMBER2,"row_gap":{"unit":"px","size":16,"sizes":[]}}
    if autoresponse:
        actions.append("email2")
        s["email_to_2"]='[field id="email"]'
        s["email_subject_2"]=AUTOREP[0]
        s["email_content_2"]=AUTOREP[1]
        s["email_from_name_2"]="Dorikko-Saveurs"
        s["email_reply_to_2"]=email_to
    if redirect:
        actions.append("redirect")
        s["redirect_to"]=redirect
    s["submit_actions"]=actions
    return widget("form",s)

# ---- Pro : price list ----
def price_list(items):
    lst=[]
    for n,p,d in items:
        it={"_id":uid()[:7],"title":n,"price":p,"description_text":(d or ""),
            "item_image":{"url":"","id":""},"link":{"url":"","is_external":"","nofollow":""}}
        lst.append(it)
    s={"price_list":lst,"separator_style":"dotted","separator_color":"rgba(243,232,214,.25)",
       "title_color":CREAM,"price_color":GOLD,"description_color":MUTED,
       "heading_typography_typography":"custom","heading_typography_font_family":HF,
       "heading_typography_font_size":T(19),"heading_typography_font_weight":"600",
       "price_typography_typography":"custom","price_typography_font_family":AF,
       "price_typography_font_style":"italic","price_typography_font_size":T(18),
       "description_typography_typography":"custom","description_typography_font_family":BF,
       "description_typography_font_size":T(13),"item_padding":pad(10,0,10,0)}
    return widget("price-list",s)

# ---- Pro : nav menu ----
def navmenu():
    s={"menu":"","layout":"horizontal","align_items":"center","pointer":"underline","animation_line":"fade",
       "menu_typography_typography":"custom","menu_typography_font_family":BF,"menu_typography_font_size":T(13),
       "menu_typography_font_weight":"600","menu_typography_text_transform":"uppercase","menu_typography_letter_spacing":T(1.5),
       "color_menu_item":CREAM2,"color_menu_item_hover":EMBER2,"pointer_color_hover":EMBER,
       "color_menu_item_active":EMBER2,"pointer_color_active":EMBER,
       "color_dropdown_item":CREAM2,"background_color_dropdown":INK2,"color_dropdown_item_hover":"#ffffff",
       "background_color_dropdown_hover":EMBER,"toggle_color":CREAM,"dropdown":"mobile_tablet"}
    return widget("nav-menu",s)

def logo(h=150):
    return widget("image",{"image":{"url":"","id":"","alt":"Dorikko Saveurs — Frais, Local, Bio","source":"library"},
        "align":"center","width":T(h)})

# ---------- sections & colonnes ----------
def col(size,els,bg=None,bgc=None,padding=None,padding_m=None,valign=None,anim=None,delay=None,
        size_t=None,size_m=100,extra=None):
    s={"_column_size":size,"_inline_size":size}
    if size_t is not None: s["_inline_size_tablet"]=size_t
    if size_m is not None: s["_inline_size_mobile"]=size_m
    if bgc: s["background_background"]="classic"; s["background_color"]=bgc
    if padding: s["padding"]=pad(*padding)
    if padding_m: s["padding_mobile"]=pad(*padding_m)
    if valign: s["content_position"]=valign
    if anim: s["_animation"]=anim
    if delay is not None: s["_animation_delay"]=delay
    if extra: s.update(extra)
    return {"id":uid(),"elType":"column","settings":s,"elements":els,"isInner":False}

def icol(size,els,bgc=None,padding=None,size_m=100,extra=None):
    s={"_column_size":size,"_inline_size":size,"_inline_size_mobile":size_m}
    if bgc: s["background_background"]="classic"; s["background_color"]=bgc
    if padding: s["padding"]=pad(*padding)
    if extra: s.update(extra)
    return {"id":uid(),"elType":"column","settings":s,"elements":els,"isInner":True}

def inner(cols,extra=None):
    s={"gap":"default"}
    if extra: s.update(extra)
    return {"id":uid(),"elType":"section","settings":s,"elements":cols,"isInner":True}

def sec(cols,bg=None,bg_image=None,overlay=None,padding=(120,20,120,20),padding_m=(72,18,72,18),
        min_h=None,min_h_m=None,content_pos=None,extra=None,full=False):
    s={"content_width":({"unit":"px","size":1180,"sizes":[]}),"layout":("full_width" if full else "boxed")}
    if bg: s["background_background"]="classic"; s["background_color"]=bg
    if bg_image:
        s["background_background"]="classic"
        s["background_image"]={"url":bg_image,"id":"","source":"url"}
        s["background_position"]="center center"; s["background_size"]="cover"
    if overlay:
        s["background_overlay_background"]="classic"; s["background_overlay_color"]=overlay
    s["padding"]=pad(*padding)
    if padding_m: s["padding_mobile"]=pad(*padding_m)
    if min_h is not None: s["min_height"]=T(min_h,"vh")
    if min_h_m is not None: s["min_height_mobile"]=T(min_h_m,"vh")
    if content_pos: s["content_position"]=content_pos
    if extra: s.update(extra)
    return section(s,cols)

EYE=lambda t,c=EMBER2,align=None: heading(t,12,c,tag="span",weight="600",font=BF,letter=4,
                                          transform="uppercase",mb=18,align=align)

# ================= COMPOSANTS RÉUTILISABLES =================
def banner(crumb,title,lead,bg,min_h=55):
    crumb_html=f'<p style="letter-spacing:.2em;text-transform:uppercase;font-size:12px;color:#b6a489;margin:0">{crumb}</p>'
    c=col(100,[
        textw(crumb_html,MUTED,12,mb=18),
        heading(title,(96,60,42),CREAM,tag="h1",weight="600"),
        textw(lead,CREAM2,18,mb=0),
    ],anim="fadeInUp")
    return sec([c],bg_image=bg,overlay="rgba(14,9,5,0.6)",padding=(150,20,72,20),
               padding_m=(110,18,54,18),min_h=min_h,min_h_m=46,content_pos="bottom")

def features_cols():
    data=[("fas fa-cow","Viande 100% ferme","Élevée chez nous, en pâturage libre, avec une traçabilité totale."),
          ("fas fa-leaf","Produits bio","Légumes et herbes de cultures biologiques voisines, à maturité."),
          ("fas fa-utensils","Cuisine locale","Une carte ancrée dans le terroir et les épices de la région."),
          ("fas fa-handshake","Hospitalité","Un accueil chaleureux, parce qu'un bon repas se partage.")]
    return [col(50,[iconbox(i,"fa-solid",t,d)],size_t=50,size_m=100,anim="fadeInUp",delay=(k%2)*120,
                padding=(28,30,28,10)) for k,(i,t,d) in enumerate(data)]

def labels_cols():
    data=[("fas fa-certificate","IBB","Élevage certifié"),("fas fa-leaf","BIO","Agriculture biologique"),
          ("fas fa-tractor","Ferme","Du pré à l'assiette"),("fas fa-fire","Feu de bois","Cuisson traditionnelle")]
    out=[]
    for k,(i,t,d) in enumerate(data):
        out.append(col(25,[iconbox(i,"fa-solid",t,d)],size_t=50,size_m=50,anim="fadeInUp",delay=k*100))
    return out

def cta_section(eyebrow,title,text,btn="Réserver une table",url="contact.html"):
    c=col(100,[EYE(eyebrow,"#ffffff",align="center"),
               heading(title,(54,40,30),"#ffffff",align="center",mb=14),
               textw(text,"rgba(255,255,255,.86)",17,align="center",mb=28),
               button(btn,url,dark=True,align="center")],anim="fadeInUp")
    return sec([c],bg=EMBER,padding=(96,20,96,20),padding_m=(64,18,64,18))

def footer_template():
    brand=col(34,[
        heading("DORIKKO SAVEURS",26,CREAM,tag="div",weight="600",letter=2,mb=8),
        heading("Frais · Local · Bio",14,EMBER2,tag="div",italic=True,font=HF,mb=18),
        textw("Maison de viande &amp; terroir à Kpalimé. Frais, local, bio — nous cultivons le goût du vrai, de la ferme à la braise.",MUTED,14,mb=18),
        socials()],size_t=100,size_m=100,anim="fadeInUp")
    visit=col(20,[heading("Visiter",12,GOLD,tag="div",weight="600",font=BF,letter=3,transform="uppercase",mb=20),
                  iconlist([("Accueil","index.html"),("La maison","la-maison.html"),("Le menu","le-menu.html"),
                            ("Galerie","galerie.html"),("Réserver","contact.html")])],size_t=50,size_m=100)
    find=col(22,[heading("Nous trouver",12,GOLD,tag="div",weight="600",font=BF,letter=3,transform="uppercase",mb=20),
                 iconlist([("Zomayi, près de Togo Grain","contact.html"),("Kpalimé, Togo","contact.html"),
                           ("+228 91 69 84 29","tel:+22891698429"),("info@dorikko-saveurs.com","mailto:info@dorikko-saveurs.com")])],
                 size_t=50,size_m=100)
    nl=col(24,[heading("La lettre du feu",12,GOLD,tag="div",weight="600",font=BF,letter=3,transform="uppercase",mb=20),
               textw("Suggestions du chef, soirées braise et arrivages de la ferme — une fois par mois.",MUTED,14,mb=16),
               form("Newsletter",[{"type":"email","label":"E-mail","ph":"Votre e-mail","w":"100","req":True}],"S'abonner",
                    subject="Newsletter — inscription")],size_t=100,size_m=100)
    main=sec([brand,visit,find,nl],bg=DARK,padding=(90,20,46,20),padding_m=(64,18,40,18))
    bottom=sec([col(60,[textw("© 2026 Dorikko-Saveurs. Tous droits réservés.",MUTED,13)],size_m=100),
                col(40,[textw("Frais · Local · Bio — Cuisine au feu de bois",MUTED,13,align="right")],size_m=100)],
               bg=DARK,padding=(24,20,24,20),
               extra={"border_border":"solid","border_width":pad(1,0,0,0),"border_color":"rgba(243,232,214,.08)"})
    return {"version":"0.4","title":"Le Brasier — Footer","type":"section",
            "content":[main,bottom],"page_settings":{"background_background":"classic","background_color":DARK}}

def header_template():
    SEP='&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'
    topbar=sec([
        col(60,[textw("Lun – Jeu 11h–22h · Ven – Dim 11h–00h"+SEP+"Zomayi, près de Togo Grain · Kpalimé",MUTED,12.5)],
            valign="center",size_m=100,extra={"hide_mobile":"hidden-mobile"}),
        col(40,[textw('Réservations · <strong style="color:#f3e8d6">+228 91 69 84 29</strong>'+SEP+'Frais · Local · Bio',MUTED,12.5,align="right")],
            valign="center",size_m=100),
    ],bg=INK2,padding=(9,20,9,20),padding_m=(8,16,8,16))
    right=col(35,[inner([
        icol(55,[heading("Bienvenue à table",17,GOLD,tag="div",italic=True,align="right")],extra={"hide_mobile":"hidden-mobile"}),
        icol(45,[button("Réserver","contact.html",align="right")]),
    ])],valign="center",size_m=100)
    main=sec([col(35,[navmenu()],valign="center",size_m=100),
              col(30,[logo(150)],valign="center",size_m=100),
              right],bg=INK,padding=(14,20,14,20),padding_m=(12,16,12,16),
             extra={"border_border":"solid","border_width":pad(0,0,1,0),"border_color":"rgba(243,232,214,.10)"})
    return {"version":"0.4","title":"Le Brasier — Header","type":"section",
            "content":[topbar,main],"page_settings":{"background_background":"classic","background_color":INK}}

def page(title,content):
    return {"version":"0.4","title":title,"type":"page","content":content,
            "page_settings":{"background_background":"classic","background_color":INK}}

# ================= PARTENAIRES =================
def partners_section():
    plist=[("Ferme Dorikko","Notre élevage"),("Coop. d'Agou","Maraîchage bio"),
           ("Awooyo","Bière locale"),("Flag","Bière locale"),("Togo Grain","Céréales"),
           ("Marché de Kpalimé","Produits frais"),("Label BIO","Agriculture bio"),("IBB","Élevage certifié")]
    def pcard(n,t):
        return icol(25,[heading(n,22,CREAM,tag="div",align="center",mb=6),
            heading(t,10,MUTED,tag="div",weight="600",font=BF,letter=2,transform="uppercase",align="center")],
            bgc=INK2,padding=(34,18,34,18),size_m=50,
            extra={"border_border":"solid","border_width":pad(1,1,1,1),"border_color":"rgba(243,232,214,.08)",
                   "border_radius":{"unit":"px","top":"16","right":"16","bottom":"16","left":"16","isLinked":True}})
    cards=inner([pcard(n,t) for n,t in plist],extra={"gap":"default","_margin":pad(50,0,0,0)})
    body=col(100,[EYE("Ils nous accompagnent",EMBER2,align="center"),
        heading("Nos partenaires",(54,40,30),CREAM,align="center",mb=22),
        button("Devenir partenaire","contact.html",align="center"),cards],anim="fadeInUp")
    return sec([body],bg=INK,padding=(120,20,120,20),padding_m=(72,18,72,18))

# ================= ACCUEIL =================
def accueil():
    c=[]
    # HERO
    hero=col(100,[
        EYE("Steakhouse &amp; Terroir — De la ferme à la braise"),
        heading("Le goût franc de la belle viande.",(96,64,42),CREAM,tag="h1",weight="600",mb=24),
        textw("Des pièces maturées sur l'os, élevées dans notre ferme, saisies au feu de bois de chêne. Une cuisine locale, bio et sans détour — pensée pour réveiller les sens.",CREAM2,19,mb=34),
        inner([icol(28,[button("Réserver une table","contact.html")],size_m=100),
               icol(72,[button("Découvrir le menu","le-menu.html",ghost=True)],size_m=100)]),
    ],anim="fadeInUp")
    c.append(sec([hero],bg_image="https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=2000&q=80",
                 overlay="rgba(14,9,5,0.62)",padding=(150,20,150,20),padding_m=(120,18,110,18),min_h=92,min_h_m=86,content_pos="middle"))
    # MARQUEE (placeholder — voir README pour widget animé)
    c.append(sec([col(100,[heading("Viande maturée  ✶  Feu de bois  ✶  Terroir &amp; ferme  ✶  100% bio  ✶  Côte de bœuf  ✶  Saveurs authentiques",
                 (22,18,15),"#ffffff",tag="div",weight="500",italic=True,align="center")])],
                 bg=EMBER,padding=(22,20,22,20),padding_m=(18,14,18,14)))
    # DISHES
    c.append(sec([col(60,[EYE("Les signatures de la maison"),heading("Des pièces qui donnent faim.",(56,40,32),CREAM,mb=0)],size_m=100,anim="fadeInUp"),
                  col(40,[textw("Chaque viande est sélectionnée à la ferme, maturée avec patience puis saisie minute. Voici les incontournables de Dorikko.",MUTED,16)],size_m=100,anim="fadeInUp",delay=120)],
                 bg=INK,padding=(120,20,40,20),padding_m=(72,18,30,18)))
    def dish(img,tag,name,price,desc,delay):
        return col(33,[image(img,name),
            heading(tag,11,GOLD,tag="div",weight="600",font=BF,letter=2,transform="uppercase",mb=8),
            heading(name,25,CREAM,tag="h3",mb=6),
            heading(price+" FCFA",22,EMBER2,tag="div",italic=True,mb=10),
            textw(desc,MUTED,14)],bgc=INK2,padding=(0,0,28,0),size_t=50,size_m=100,anim="fadeInUp",delay=delay,
            extra={"padding":pad(0,0,28,0)})
    c.append(sec([
        dish("https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80","Maturée 40 jours · à partager","Côte de bœuf au feu de bois","18 500","Pièce d'1,2 kg pour deux, saisie sur braise de chêne, fleur de sel, beurre maître d'hôtel.",0),
        dish("https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=900&q=80","Race locale · grillée minute","Entrecôte du terroir","9 800","Persillée et fondante, gratin d'igname et sauce poivre vert maison.",120),
        dish("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80","Spécialité Dorikko","Brochettes de la ferme","6 500","Filet mariné aux épices du marché, grillé à la braise, oignons confits.",240),
    ],bg=INK,padding=(0,20,80,20),padding_m=(0,18,56,18)))
    c.append(sec([col(100,[button("Voir toute la carte","le-menu.html",ghost=True,align="center")],anim="fadeInUp")],bg=INK,padding=(0,20,120,20),padding_m=(0,18,72,18)))
    # STORY
    c.append(sec([
        col(50,[image("https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80","Notre chef")],size_m=100,anim="fadeInUp"),
        col(50,[EYE("Notre histoire"),heading("De la ferme à la braise.",(52,40,30),CREAM,mb=22),
            textw("Dorikko-Saveurs est née d'une conviction simple : une grande viande commence bien avant l'assiette. Tout part de notre ferme, où nos bêtes grandissent au rythme du terroir.",CREAM2,17,mb=16),
            textw("En cuisine, notre chef respecte ce travail : une maturation lente, une braise vive, des gestes précis. Rien de superflu — juste le produit, sublimé.",CREAM2,17,mb=24),
            heading("Le Chef Dorikko",32,GOLD,tag="div",italic=True,mb=4),
            heading("Fondateur &amp; Maître du feu",12,MUTED,tag="div",weight="500",font=BF,letter=2,transform="uppercase",mb=24),
            button("Découvrir la maison","la-maison.html",ghost=True)],size_m=100,valign="center",anim="fadeInUp",delay=120)],
        bg=INK2,padding=(120,20,120,20),padding_m=(72,18,72,18)))
    # FEATURES
    c.append(sec(features_cols(),bg=INK,padding=(90,20,90,20),padding_m=(56,18,56,18),
             extra={"border_border":"solid","border_width":pad(1,0,1,0),"border_color":"rgba(243,232,214,.14)"}))
    # QUOTE BAND
    c.append(sec([col(100,[EYE("Venez savourer l'authenticité",GOLD,align="center"),
        heading("La braise ne ment jamais. Elle révèle le vrai goût d'une viande honnête.",(48,36,26),CREAM,tag="div",italic=True,weight="400",align="center",mb=20),
        heading("— L'esprit Dorikko",12,GOLD,tag="div",weight="600",font=BF,letter=3,transform="uppercase",align="center")],anim="fadeInUp")],
        bg_image="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=2000&q=80",
        overlay="rgba(14,9,5,0.72)",padding=(150,20,150,20),padding_m=(96,18,96,18)))
    # MENU PREVIEW (Price List Pro)
    c.append(sec([col(60,[EYE("La carte"),heading("Le menu du feu.",(56,40,32),CREAM,mb=0)],size_m=100,anim="fadeInUp"),
                  col(40,[textw("Une sélection courte et changeante, dictée par la ferme et le marché du jour.",MUTED,16)],size_m=100,anim="fadeInUp",delay=120)],
                 bg=INK2,padding=(120,20,40,20),padding_m=(72,18,30,18)))
    left=col(60,[
        heading("Apéritifs",15,EMBER2,tag="div",italic=True,mb=8),
        price_list([("Choukoya de chèvre","3 000","Chèvre grillée aux épices africaines, servie chaude."),
                    ("Brochettes de viande grillée","2 500","Bœuf, mouton ou poulet, marinés aux épices locales."),
                    ("Assortiment d'allocos","1 800","Banane plantain frite, sauce piment et viande séchée.")]),
        heading("Plats principaux",15,EMBER2,tag="div",italic=True,mb=8),
        price_list([("Fufu + Sauce graine","3 500","Avec morceaux de bœuf ou de mouton."),
                    ("Riz gras togolais à la viande","3 000","Riz parfumé, sauce tomate riche, viande assaisonnée."),
                    ("Poulet bicyclette braisé","4 500","Braisé au feu de bois, frites de manioc ou plantain."),
                    ("Gboma dessi","3 200","Feuilles de gboma mijotées, viande, riz ou pâte de maïs.")]),
    ],size_m=100,anim="fadeInUp")
    aside=col(40,[image("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80","Viande à la braise"),
        textw('« Le menu change avec les saisons et les arrivages de la ferme. Demandez la suggestion du chef. »',MUTED,13,mb=0)],
        size_m=100,anim="fadeInUp",delay=120)
    c.append(sec([left,aside],bg=INK2,padding=(0,20,120,20),padding_m=(0,18,72,18)))
    # RESERVATION (Pro Form)
    hours_html="".join(
        '<p style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(243,232,214,.08);padding:14px 0;margin:0">'
        '<span style="color:#f3e8d6;font-weight:600">{d}</span><span style="font-family:Fraunces;font-style:italic;color:#c89b53">{t}</span></p>'.format(d=d,t=t)
        for d,t in [("Lundi – Jeudi","11h00 – 22h00"),("Vendredi","11h00 – 00h00"),("Samedi","11h00 – 00h00"),("Dimanche","11h00 – 00h00")])
    hours=col(50,[EYE("Nos horaires"),heading("Heures d'ouverture",(40,32,26),CREAM,mb=14),
        textw("Ouvert tous les jours, midi et soir. Réservation conseillée le week-end.",MUTED,16,mb=20),
        textw(hours_html,CREAM2,15)],bgc=PANEL,padding=(56,48,56,48),padding_m=(40,26,40,26),size_m=100,anim="fadeInUp")
    resa=col(50,[heading("Réservez votre table",12,"#ffffff",tag="div",weight="600",font=BF,letter=4,transform="uppercase",mb=18),
        heading("Une place au coin du feu.",(44,34,28),"#ffffff",mb=16),
        textw("Réservez en quelques secondes — nous vous rappelons pour confirmer.","rgba(255,255,255,.86)",16,mb=24),
        form("Réservation rapide",[
            {"type":"text","label":"Nom","ph":"Votre nom","w":"50","req":True},
            {"type":"text","label":"Téléphone","ph":"Téléphone","w":"50","req":True},
            {"type":"email","label":"E-mail","ph":"vous@exemple.com","w":"100","id":"email"},
            {"type":"date","label":"Date","w":"50","req":True},
            {"type":"select","label":"Personnes","w":"50","options":["2 personnes","3 personnes","4 personnes","5 et plus"]},
        ],"Réserver maintenant")],bgc=EMBER,padding=(56,48,56,48),padding_m=(40,26,40,26),size_m=100,anim="fadeInUp",delay=120)
    c.append(sec([hours,resa],bg=INK,padding=(120,20,120,20),padding_m=(0,0,0,0)))
    # TESTIMONIAL
    c.append(sec([col(100,[heading("★★★★★",20,GOLD,tag="div",align="center",weight="400",font=BF,letter=6,mb=20),
        heading("La meilleure côte de bœuf que j'aie mangée. On sent le travail de la ferme jusque dans l'assiette — et l'accueil est à la hauteur.",(40,32,24),CREAM,tag="div",italic=True,weight="400",align="center",mb=24),
        heading("Awa K. — Cliente fidèle",12,MUTED,tag="div",weight="600",font=BF,letter=3,transform="uppercase",align="center")],anim="fadeInUp")],
        bg=INK2,padding=(120,20,120,20),padding_m=(72,18,72,18)))
    # PARTENAIRES (remplace l'ancienne bande de labels)
    c.append(partners_section())
    # GALLERY preview
    c.append(sec([col(60,[EYE("En images"),heading("L'instant Dorikko.",(56,40,32),CREAM,mb=0)],size_m=100,anim="fadeInUp"),
                  col(40,[textw('Suivez le feu, les plats et l\'ambiance sur Instagram <strong style="color:#e07a2c">@dorikko.saveurs</strong>',MUTED,16)],size_m=100,anim="fadeInUp",delay=120)],
                 bg=INK,padding=(120,20,40,20),padding_m=(72,18,30,18)))
    gal=["https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80",
         "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
         "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=600&q=80",
         "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
         "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
         "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"]
    c.append(sec([col(16,[image(g)],size_t=33,size_m=50,anim="fadeInUp",delay=(k%3)*100) for k,g in enumerate(gal)],
                 bg=INK,padding=(0,20,50,20),padding_m=(0,18,40,18)))
    c.append(sec([col(100,[button("Voir la galerie","galerie.html",ghost=True,align="center")],anim="fadeInUp")],bg=INK,padding=(0,20,120,20),padding_m=(0,18,72,18)))
    accueil.blocks=[("01-hero",c[0:1]),("02-bandeau",c[1:2]),("03-signatures",c[2:5]),
        ("04-histoire",c[5:6]),("05-atouts",c[6:7]),("06-citation",c[7:8]),
        ("07-menu",c[8:10]),("08-reservation",c[10:11]),("09-temoignage",c[11:12]),
        ("10-partenaires",c[12:13]),("11-galerie",c[13:16])]
    return page("Le Brasier — Accueil (Body)",c)

# ================= LA MAISON =================
def la_maison():
    c=[]
    c.append(banner('<a href="index.html" style="color:#b6a489">Accueil</a> &nbsp;/&nbsp; <span style="color:#e07a2c">La Maison</span>',
                    "Une maison née du terroir.","De la ferme à la braise, Dorikko-Saveurs cultive une idée simple : servir une viande honnête, locale et bio, traitée avec le respect qu'elle mérite.",
                    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"))
    # STORY
    c.append(sec([
        col(52,[image("https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=80","Notre cuisine")],size_m=100,anim="fadeInUp"),
        col(48,[EYE("Notre histoire"),heading("Tout commence avant l'assiette.",(52,38,30),CREAM,mb=22),
            textw("Dorikko-Saveurs est née d'une conviction : une grande viande ne s'improvise pas. Elle se prépare bien en amont, dans le soin apporté à l'élevage et le respect du rythme des bêtes.",CREAM2,17,mb=16),
            textw("Au cœur de Kpalimé, nous avons voulu un lieu où le feu de bois rencontre le terroir — une table franche et chaleureuse, fidèle à ce que la région a de meilleur.",CREAM2,17,mb=24),
            heading("Le Chef Dorikko",30,GOLD,tag="div",italic=True,mb=4),
            heading("Fondateur &amp; Maître du feu",12,MUTED,tag="div",weight="500",font=BF,letter=2,transform="uppercase")],size_m=100,valign="center",anim="fadeInUp",delay=120)],
        bg=INK,padding=(120,20,80,20),padding_m=(72,18,56,18)))
    # STATS (counters)
    c.append(sec([col(25,[counter(100,"%","Viande de la ferme")],size_t=50,size_m=50,anim="fadeInUp",delay=0),
                  col(25,[counter(40,"j","De maturation")],size_t=50,size_m=50,anim="fadeInUp",delay=100),
                  col(25,[counter(0,"","Conservateur ajouté")],size_t=50,size_m=50,anim="fadeInUp",delay=200),
                  col(25,[counter(7,"/7","Ouvert midi &amp; soir")],size_t=50,size_m=50,anim="fadeInUp",delay=300)],
                 bg=INK,padding=(0,20,90,20),padding_m=(0,18,56,18),
                 extra={"border_border":"solid","border_width":pad(1,0,1,0),"border_color":"rgba(243,232,214,.14)"}))
    # FARM
    c.append(sec([
        col(50,[EYE("De la ferme"),heading("Élevé chez nous, en plein air.",(50,38,28),CREAM,mb=22),
            textw("Nos bêtes grandissent sur nos terres, en pâturage libre, nourries sans artifice. Cette proximité nous donne une traçabilité totale — nous savons exactement ce que nous servons.",CREAM2,17,mb=16),
            textw("Les légumes, ignames et herbes qui accompagnent nos viandes viennent de cultures bio voisines, récoltées à maturité.",CREAM2,17,mb=20),
            iconlist([("Pâturage libre &amp; alimentation naturelle","#"),("Maturation lente sur l'os","#"),("Accompagnements bio &amp; locaux","#")])],size_m=100,valign="center",anim="fadeInUp"),
        col(50,[image("https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1000&q=80","Produits frais")],size_m=100,anim="fadeInUp",delay=120)],
        bg=INK2,padding=(120,20,120,20),padding_m=(72,18,72,18)))
    # QUOTE
    c.append(sec([col(100,[EYE("La philosophie de la maison",GOLD,align="center"),
        heading("Le feu ne pardonne rien. C'est pour ça qu'il révèle tout : la qualité d'une viande honnête.",(48,36,26),CREAM,tag="div",italic=True,weight="400",align="center",mb=20),
        heading("— Le Chef Dorikko",12,GOLD,tag="div",weight="600",font=BF,letter=3,transform="uppercase",align="center")],anim="fadeInUp")],
        bg_image="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=2000&q=80",
        overlay="rgba(14,9,5,0.72)",padding=(150,20,150,20),padding_m=(96,18,96,18)))
    # CHEF
    c.append(sec([
        col(52,[image("https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80","Le chef")],size_m=100,anim="fadeInUp"),
        col(48,[EYE("Le chef"),heading("Le gardien de la braise.",(50,38,28),CREAM,mb=22),
            textw("Derrière chaque pièce, il y a un geste précis et beaucoup de patience. Notre chef travaille la viande à la minute, ajuste sa cuisson à l'œil et à l'oreille, et laisse le bois de chêne faire le reste.",CREAM2,17,mb=16),
            textw("Sa cuisine est sans esbroufe : peu d'ingrédients, mais des produits justes.",CREAM2,17,mb=24),
            button("Découvrir sa carte","le-menu.html",ghost=True)],size_m=100,valign="center",anim="fadeInUp",delay=120)],
        bg=INK,padding=(120,20,80,20),padding_m=(72,18,56,18)))
    # ENGAGEMENTS
    c.append(sec([col(100,[EYE("Nos engagements",EMBER2,align="center"),
        heading("Quatre promesses, tenues chaque jour.",(48,36,28),CREAM,align="center",mb=0)],anim="fadeInUp")],
        bg=INK,padding=(0,20,50,20),padding_m=(0,18,36,18)))
    c.append(sec(features_cols(),bg=INK,padding=(0,20,120,20),padding_m=(0,18,72,18),
             extra={"border_border":"solid","border_width":pad(1,0,1,0),"border_color":"rgba(243,232,214,.14)"}))
    # LABELS
    c.append(sec(labels_cols(),bg=INK2,padding=(56,20,56,20),padding_m=(40,18,40,18)))
    # CTA
    c.append(cta_section("Une table vous attend","Venez vivre l'expérience Dorikko.","Réservez votre table et laissez la braise faire le reste."))
    return page("Le Brasier — La Maison (Body)",c)

# ================= LE MENU =================
def le_menu():
    c=[]
    c.append(banner('<a href="index.html" style="color:#b6a489">Accueil</a> &nbsp;/&nbsp; <span style="color:#e07a2c">Le Menu</span>',
                    "La carte du feu.","Une sélection courte et franche, dictée par la ferme et le marché du jour. Les prix sont indiqués en FCFA.",
                    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80"))
    def catblock(title,sub,items):
        return [heading(title,28,CREAM,tag="h3",mb=4),
                heading(sub,11,GOLD,tag="div",weight="600",font=BF,letter=2,transform="uppercase",mb=14),
                price_list(items)]
    left=col(50,
        catblock("Apéritifs","Pour commencer",[
            ("Choukoya de chèvre","3 000","Morceaux de chèvre grillés et assaisonnés aux épices africaines, servis chauds."),
            ("Brochettes de viande grillée","2 500","Bœuf, mouton ou poulet, marinés aux épices locales."),
            ("Boulettes de viande épicées","2 000","Façon locale, avec oignons et piment."),
            ("Assortiment d'allocos","1 800","Banane plantain frite, sauce piment et viande séchée en topping.")])
        +catblock("Desserts","Douceurs",[
            ("Kanélo","1 200","Beignets sucrés de plantain mûr, croustillants dehors et moelleux dedans."),
            ("Dègué au croustillons de mil","1 500","Couscous de mil mélangé à du yaourt sucré, parfumé à la vanille."),
            ("Tartine de pain sucré au miel de Kpalimé","1 500","Pain doux local accompagné de miel artisanal de la région.")]),
        size_m=100,anim="fadeInUp")
    right=col(50,
        catblock("Plats principaux","Le cœur de la carte",[
            ("Fufu + Sauce graine","3 500","Fufu accompagné d'une sauce graine et de morceaux de bœuf ou de mouton."),
            ("Riz gras togolais à la viande","3 000","Riz parfumé cuit dans une sauce tomate riche, morceaux de viande assaisonnée."),
            ("Poulet bicyclette braisé","4 500","Mariné aux épices, braisé au feu de bois, frites de manioc ou banane plantain."),
            ("Gboma dessi","3 200","Feuilles de gboma mijotées, sauce tomate et épices, viande, riz ou pâte de maïs.")])
        +catblock("Boissons","À partager",[
            ("Boissons fraîches","800","Sodas, bières locales (Flag, Awooyo), vins."),
            ("Jus de bissap / hibiscus","1 000","Préparé maison, sucré et rafraîchissant."),
            ("Boissons locales","1 500","Sodabi, vin de palme, eau-de-vie parfumée au gingembre ou aux épices.")]),
        size_m=100,anim="fadeInUp",delay=120)
    c.append(sec([left,right],bg=INK,padding=(120,20,60,20),padding_m=(72,18,40,18)))
    c.append(sec([col(100,[heading("« La carte évolue avec les saisons et les arrivages de la ferme — demandez la suggestion du chef. »",
        (21,18,16),MUTED,tag="div",italic=True,align="center")],anim="fadeInUp")],bg=INK,padding=(0,20,120,20),padding_m=(0,18,72,18)))
    c.append(cta_section("Réservez votre table","Le feu est allumé.","Réservez dès maintenant et choisissez votre pièce une fois à table."))
    return page("Le Brasier — Le Menu (Body)",c)

# ================= GALERIE =================
def galerie():
    c=[]
    c.append(banner('<a href="index.html" style="color:#b6a489">Accueil</a> &nbsp;/&nbsp; <span style="color:#e07a2c">Galerie</span>',
                    "L'instant Dorikko.","Le feu, les plats, la salle et les visages. Quelques images de ce qui vous attend à la maison.",
                    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=2000&q=80"))
    imgs=["https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&q=80"]
    cols=[col(25,[image(g)],size_t=33,size_m=50,anim="fadeInUp",delay=(k%4)*90) for k,g in enumerate(imgs)]
    c.append(sec(cols,bg=INK,padding=(110,20,80,20),padding_m=(72,18,56,18)))
    c.append(sec([col(100,[EYE("Sur Instagram",EMBER2,align="center"),
        heading("Suivez le feu au quotidien — @dorikko.saveurs",(34,28,22),CREAM,tag="div",italic=True,align="center",mb=22),
        button("Nous suivre","#",align="center")],anim="fadeInUp")],bg=INK2,padding=(96,20,96,20),padding_m=(64,18,64,18)))
    c.append(cta_section("Envie d'y être ?","Réservez votre table.","Les images donnent faim — la réalité est encore meilleure."))
    return page("Le Brasier — Galerie (Body)",c)

# ================= CONTACT =================
def contact():
    c=[]
    c.append(banner('<a href="index.html" style="color:#b6a489">Accueil</a> &nbsp;/&nbsp; <span style="color:#e07a2c">Réserver</span>',
                    "Une place au coin du feu.","Réservez votre table en quelques secondes — nous vous rappelons pour confirmer.",
                    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80",min_h=48))
    # 1) Horaires + Réservation
    hours_html="".join(
        '<p style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(243,232,214,.08);padding:14px 0;margin:0">'
        '<span style="color:#f3e8d6;font-weight:600">{d}</span><span style="font-family:Fraunces;font-style:italic;color:#c89b53">{t}</span></p>'.format(d=d,t=t)
        for d,t in [("Lundi – Jeudi","11h00 – 22h00"),("Vendredi","11h00 – 00h00"),("Samedi","11h00 – 00h00"),("Dimanche","11h00 – 00h00")])
    hours=col(50,[EYE("Nos horaires"),heading("Heures d'ouverture",(40,32,26),CREAM,mb=14),
        textw("Ouvert tous les jours, midi et soir. Réservation conseillée le week-end.",MUTED,16,mb=20),
        textw(hours_html,CREAM2,15)],bgc=PANEL,padding=(56,48,56,48),padding_m=(40,26,40,26),size_m=100)
    resa=col(50,[heading("Réservation",12,"#ffffff",tag="div",weight="600",font=BF,letter=4,transform="uppercase",mb=18),
        heading("Réserver une table",(44,34,28),"#ffffff",mb=16),
        textw("Réservez en quelques secondes — nous vous rappelons pour confirmer.","rgba(255,255,255,.86)",16,mb=24),
        form("Réservation",[
            {"type":"text","label":"Nom complet","ph":"Votre nom","w":"50","req":True},
            {"type":"text","label":"Téléphone","ph":"+228 ...","w":"50","req":True},
            {"type":"email","label":"E-mail","ph":"vous@exemple.com","w":"100","id":"email"},
            {"type":"select","label":"Nombre de personnes","w":"50","options":["1 personne","2 personnes","3 personnes","4 personnes","5 personnes","6 et plus"]},
            {"type":"date","label":"Date","w":"25","req":True},
            {"type":"time","label":"Heure","w":"25","req":True},
            {"type":"textarea","label":"Message (allergies, occasion…)","ph":"Une demande particulière ?","w":"100"},
        ],"Réserver maintenant")],bgc=EMBER,padding=(56,48,56,48),padding_m=(40,26,40,26),size_m=100)
    c.append(sec([hours,resa],bg=INK,padding=(120,20,60,20),padding_m=(0,0,30,0)))
    # 2) Infos & accès + Google Map
    def info(icon,h,p,small):
        html=(f'<div style="display:flex;gap:18px;padding:22px 0;border-bottom:1px solid rgba(243,232,214,.08)">'
              f'<span style="color:#e07a2c;font-size:22px;flex:none">{icon}</span><div>'
              f'<div style="font-family:Archivo;font-weight:600;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#c89b53;margin-bottom:6px">{h}</div>'
              f'<div style="font-family:Fraunces;color:#e7d8c0;font-size:17px">{p}<br><span style="font-family:Archivo;font-size:13px;color:#b6a489">{small}</span></div></div></div>')
        return textw(html,CREAM2,16)
    gmap=('<iframe title="Carte Dorikko-Saveurs, Kpalimé" loading="lazy" allowfullscreen '
          'src="https://maps.google.com/maps?q=Kpalim%C3%A9%2C%20Togo&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=&amp;output=embed" '
          'style="width:100%;height:470px;border:0;display:block"></iframe>')
    infocol=col(45,[EYE("Nous trouver"),heading("Infos &amp; accès",(42,34,28),CREAM,mb=18),
        info("📍","Adresse","Zomayi, non loin de Togo Grain","Kpalimé, Togo"),
        info("📞","Téléphone","+228 91 69 84 29","Réservations &amp; renseignements"),
        info("✉️","E-mail","info@dorikko-saveurs.com","Réponse sous 24 h"),
        info("🕐","Horaires","Lun – Jeu : 11h – 22h","Ven – Dim : 11h – minuit · 7j/7")],valign="center",size_m=100)
    mapcol=col(55,[html_widget(gmap)],valign="center",size_m=100)
    c.append(sec([infocol,mapcol],bg=INK,padding=(60,20,120,20),padding_m=(30,18,72,18)))
    c.append(sec([col(100,[EYE("Toujours ouvert pour vous",GOLD,align="center"),
        heading("Midi et soir, sept jours sur sept. Le feu vous attend.",(48,36,26),CREAM,tag="div",italic=True,weight="400",align="center",mb=20),
        heading("— Dorikko-Saveurs, Kpalimé",12,GOLD,tag="div",weight="600",font=BF,letter=3,transform="uppercase",align="center")])],
        bg_image="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=2000&q=80",
        overlay="rgba(14,9,5,0.72)",padding=(120,20,120,20),padding_m=(80,18,80,18)))
    return page("Le Brasier — Contact (Body)",c)

# ================= WRITE =================
outputs={
    "header.json":header_template(),
    "footer.json":footer_template(),
    "accueil-body.json":accueil(),
    "la-maison-body.json":la_maison(),
    "le-menu-body.json":le_menu(),
    "galerie-body.json":galerie(),
    "contact-body.json":contact(),
}
def count(els,acc):
    for e in els:
        acc[0]+=1
        if e["elType"]=="widget": acc[1].add(e.get("widgetType"))
        count(e.get("elements",[]),acc)
for fn,tpl in outputs.items():
    with open(fn,"w",encoding="utf-8") as f:
        json.dump(tpl,f,ensure_ascii=False,indent=1)
    acc=[0,set()]; count(tpl["content"],acc)
    print(f"{fn:22s} type={tpl['type']:8s} elems={acc[0]:4d} widgets={sorted(acc[1])}")

# --- Accueil : un fichier JSON par section, dans un dossier dédié ---
import os
SECDIR="accueil-sections"
os.makedirs(SECDIR,exist_ok=True)
accueil()  # recalcule accueil.blocks avec des IDs neufs (pas de collision avec accueil-body.json)
print(f"--- {SECDIR}/ (section par section) ---")
for slug,secs in accueil.blocks:
    tpl={"version":"0.4","title":f"Accueil — {slug}","type":"section","content":secs,
         "page_settings":{"background_background":"classic","background_color":INK}}
    with open(os.path.join(SECDIR,slug+".json"),"w",encoding="utf-8") as f:
        json.dump(tpl,f,ensure_ascii=False,indent=1)
    acc=[0,set()]; count(secs,acc)
    print(f"  {slug+'.json':26s} elems={acc[0]:3d} widgets={sorted(acc[1])}")
print("OK")
