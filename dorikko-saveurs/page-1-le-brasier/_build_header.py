# -*- coding: utf-8 -*-
"""Génère le template Elementor du HEADER (topbar + nav) — Le Brasier."""
import json, secrets

_used=set()
def uid():
    while True:
        u=secrets.token_hex(4)[:7]
        if u not in _used:
            _used.add(u); return u

INK="#15100B"; INK2="#1C150E"
CREAM="#F3E8D6"; CREAM2="#E7D8C0"; MUTED="#B6A489"
EMBER="#C2511F"; EMBER2="#E07A2C"; GOLD="#C89B53"
HF="Fraunces"; BF="Archivo"

def fs(px): return {"unit":"px","size":px,"sizes":[]}
def lsp(px): return {"unit":"px","size":px,"sizes":[]}
def pad(t,r,b,l): return {"unit":"px","top":str(t),"right":str(r),"bottom":str(b),"left":str(l),"isLinked":False}
def widget(wt,s): return {"id":uid(),"elType":"widget","settings":s,"elements":[],"widgetType":wt}
def section(s,cols,inner=False): return {"id":uid(),"elType":"section","settings":s,"elements":cols,"isInner":inner}
def column(size,els,extra=None,inner=False):
    s={"_column_size":size,"_inline_size":size}
    if extra: s.update(extra)
    return {"id":uid(),"elType":"column","settings":s,"elements":els,"isInner":inner}

def textw(html,color=CREAM2,size=13,align="left",font=BF):
    if not html.lstrip().startswith("<"): html=f"<p>{html}</p>"
    return widget("text-editor",{"editor":html,"text_color":color,"align":align,
        "typography_typography":"custom","typography_font_family":font,"typography_font_size":fs(size)})

def heading(title,size,color,tag="div",weight="600",font=HF,align="left",letter=None,transform=None,italic=None):
    s={"title":title,"header_size":tag,"align":align,"title_color":color,
       "typography_typography":"custom","typography_font_family":font,
       "typography_font_size":fs(size),"typography_font_weight":weight}
    if letter is not None: s["typography_letter_spacing"]=lsp(letter)
    if transform: s["typography_text_transform"]=transform
    if italic: s["typography_font_style"]="italic"
    return widget("heading",s)

def button(text,url="#"):
    return widget("button",{"text":text,"link":{"url":url,"is_external":"","nofollow":""},"align":"right",
        "background_color":EMBER,"button_text_color":"#ffffff","button_background_hover_color":EMBER2,
        "typography_typography":"custom","typography_font_family":BF,"typography_font_weight":"600",
        "typography_text_transform":"uppercase","typography_letter_spacing":lsp(2),"typography_font_size":fs(13),
        "border_radius":{"unit":"px","top":"0","right":"0","bottom":"0","left":"0","isLinked":True},
        "text_padding":pad(14,28,14,28)})

def logo():
    return widget("image",{"image":{"url":"","id":"","alt":"Dorikko Saveurs — Frais, Local, Bio","source":"library"},
        "align":"center","width":{"unit":"px","size":150,"sizes":[]}})

def navmenu():
    return widget("nav-menu",{
        "menu":"","layout":"horizontal","align_items":"center","pointer":"underline","animation_line":"fade",
        "menu_typography_typography":"custom","menu_typography_font_family":BF,"menu_typography_font_size":fs(13),
        "menu_typography_font_weight":"600","menu_typography_text_transform":"uppercase","menu_typography_letter_spacing":lsp(1.5),
        "color_menu_item":CREAM2,"color_menu_item_hover":EMBER2,"pointer_color_hover":EMBER,
        "color_menu_item_active":EMBER2,"pointer_color_active":EMBER,
        "color_dropdown_item":CREAM2,"background_color_dropdown":INK2,"color_dropdown_item_hover":"#ffffff",
        "background_color_dropdown_hover":EMBER,"toggle_color":CREAM})

def inner(cols,extra=None): return {"id":uid(),"elType":"section","settings":(extra or {}),"elements":cols,"isInner":True}
def icol(size,els,extra=None):
    s={"_column_size":size,"_inline_size":size}
    if extra: s.update(extra)
    return {"id":uid(),"elType":"column","settings":s,"elements":els,"isInner":True}

SEP='&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'

# ---- Topbar ----
topbar = section(
    {"layout":"boxed","content_width":{"unit":"px","size":1180,"sizes":[]},
     "background_background":"classic","background_color":INK2,"padding":pad(9,20,9,20)},
    [
        column(60,[textw("Lun – Jeu 11h–22h · Ven – Dim 11h–00h"+SEP+"Zomayi, près de Togo Grain · Kpalimé", MUTED, 12.5)],
               extra={"content_position":"center"}),
        column(40,[textw('Réservations · <strong style="color:#F3E8D6;">+228 91 69 84 29</strong>'+SEP+'Frais · Local · Bio', MUTED, 12.5, align="right")],
               extra={"content_position":"center"}),
    ])

# ---- Main header ----
right = column(35,[
    inner([
        icol(55,[heading("Bienvenue à table", 17, GOLD, italic=True, align="right")], extra={"content_position":"center"}),
        icol(45,[button("Réserver","#")], extra={"content_position":"center"}),
    ])
], extra={"content_position":"center"})

main = section(
    {"layout":"boxed","content_width":{"unit":"px","size":1180,"sizes":[]},
     "background_background":"classic","background_color":INK,"padding":pad(14,20,14,20),
     "border_border":"solid","border_width":pad(0,0,1,0),"border_color":"rgba(243,232,214,0.10)"},
    [
        column(35,[navmenu()], extra={"content_position":"center"}),
        column(30,[logo()], extra={"content_position":"center"}),
        right,
    ])

header_template={"version":"0.4","title":"Dorikko – Le Brasier (Header)","type":"section",
    "content":[topbar, main],
    "page_settings":{"background_background":"classic","background_color":INK}}

with open("elementor-header.json","w",encoding="utf-8") as f:
    json.dump(header_template,f,ensure_ascii=False,indent=1)

# validation
def walk(els,ids):
    for e in els:
        ids.append(e["id"]); walk(e.get("elements",[]),ids)
d=json.load(open("elementor-header.json",encoding="utf-8"))
ids=[]; walk(d["content"],ids)
print("elementor-header.json OK · type=",d["type"],"· sections=",len(d["content"]),
      "· elements=",len(ids),"· IDs uniques=",len(set(ids))==len(ids))
