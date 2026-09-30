# -*- coding: utf-8 -*-
"""Section « Notre Engagement — l'héritage de Frido & Féli » (textes repris de l'image).
   À importer (Modèles enregistrés) puis glisser dans la page La Maison.
   Sans animation auto-masquante. Responsive desktop/tablet/mobile."""
import json, secrets
_used=set()
def uid():
    while True:
        u=secrets.token_hex(4)[:7]
        if u not in _used: _used.add(u); return u
INK="#15100b"; INK2="#1c150e"; CREAM="#f3e8d6"; CREAM2="#e7d8c0"; MUTED="#b6a489"
EMBER2="#e07a2c"; GOLD="#c89b53"; HF="Fraunces"; BF="Archivo"
def T(px): return {"unit":"px","size":px,"sizes":[]}
def pad(t,r,b,l): return {"unit":"px","top":str(t),"right":str(r),"bottom":str(b),"left":str(l),"isLinked":False}
def setresp(s,key,d,t=None,m=None):
    s[key]=T(d)
    if t is not None: s[key+"_tablet"]=T(t)
    if m is not None: s[key+"_mobile"]=T(m)
def widget(wt,s): return {"id":uid(),"elType":"widget","settings":s,"elements":[],"widgetType":wt}
def heading(title,size,color,tag="h2",weight="600",font=HF,align=None,letter=None,transform=None,italic=False,mb=None,size_t=None,size_m=None):
    s={"title":title,"header_size":tag,"title_color":color,"typography_typography":"custom","typography_font_family":font,"typography_font_weight":weight}
    setresp(s,"typography_font_size",size,size_t,size_m)
    if align: s["align"]=align
    if letter is not None: s["typography_letter_spacing"]=T(letter)
    if transform: s["typography_text_transform"]=transform
    if italic: s["typography_font_style"]="italic"
    if mb is not None: s["_margin"]=pad(0,0,mb,0)
    return widget("heading",s)
def textw(html,color=CREAM2,size=14,mb=None,italic=False):
    if not html.lstrip().startswith("<"): html=f"<p>{html}</p>"
    s={"editor":html,"text_color":color,"typography_typography":"custom","typography_font_family":BF,"typography_font_size":T(size)}
    if italic: s["typography_font_style"]="italic"; s["typography_typography"]="custom"
    if mb is not None: s["_margin"]=pad(0,0,mb,0)
    return widget("text-editor",s)
def image(url,alt=""): return widget("image",{"image":{"url":url,"id":"","alt":alt,"source":"url"},"image_size":"full"})
EYE=lambda t,c=EMBER2: heading(t,12,c,tag="span",weight="600",font=BF,letter=4,transform="uppercase",mb=18)
def col(size,els,valign=None,size_t=None,size_m=100):
    s={"_column_size":size,"_inline_size":size,"_inline_size_mobile":size_m}
    if size_t is not None: s["_inline_size_tablet"]=size_t
    if valign: s["content_position"]=valign
    return {"id":uid(),"elType":"column","settings":s,"elements":els,"isInner":False}
def icol(size,els,size_t=None,size_m=100,valign=None):
    s={"_column_size":size,"_inline_size":size,"_inline_size_mobile":size_m}
    if size_t is not None: s["_inline_size_tablet"]=size_t
    if valign: s["content_position"]=valign
    return {"id":uid(),"elType":"column","settings":s,"elements":els,"isInner":True}
def inner(cols): return {"id":uid(),"elType":"section","settings":{"gap":"wide","_margin":pad(50,0,0,0)},"elements":cols,"isInner":True}
def sec(cols,bg=INK,padding=(120,20,120,20),padding_m=(72,18,72,18)):
    s={"content_width":{"unit":"px","size":1180,"sizes":[]},"layout":"boxed","padding":pad(*padding),
       "padding_mobile":pad(*padding_m),"background_background":"classic","background_color":bg}
    return {"id":uid(),"elType":"section","settings":s,"elements":cols,"isInner":False}

# ---- contenu (repris de l'image) ----
intro="Il y a plus de cinquante ans, dans les grands champs d'Agou, deux passionnés travaillaient la terre avec foi et détermination."
c1="Une ferme bio. Authentique. Respectueuse des traditions d'antan. Engagés pour la qualité, avant même que le mot ne devienne tendance. Leur richesse n'était pas dans les machines : elle était dans la patience."
c2="Dans le respect de la nature. Dans la conviction que ce qui vient de la terre doit nourrir avec vérité. Combien ont grandi avec le goût du foufou d'Agou ? Combien se souviennent de ces grillades aux épices africaines, simples, puissantes, sincères ? Aujourd'hui, Dorikko Saveurs prolonge cette histoire."
c3="Avec une organisation plus structurée. Une exigence maîtrisée. Une approche professionnelle. Mais avec la même âme. Nos viandes viennent de notre ferme Dorikko. Nos produits sont élevés et cultivés avec rigueur. Notre cuisine respecte la terre et honore le travail des bâtisseurs."
c4="Ici, chaque plat raconte une histoire. Celle d'un héritage. Celle d'un engagement. Celle d'une promesse transmise de génération en génération. Chez Dorikko Saveurs, tout était bio. Et tout reste bio, comme l'ont rêvé les bâtisseurs. C'est notre engagement."

top=inner([
    icol(45,[image("https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1000&q=80","Notre engagement — l'héritage")],size_t=100,size_m=100),
    icol(55,[EYE("L'héritage vivant de Frido à Féli"),
        heading("Notre Engagement, l'héritage.",44,CREAM,size_t=34,size_m=26,mb=18),
        textw(intro,CREAM2,17,mb=18),
        heading("Frido &amp; Felioto",26,GOLD,tag="div",italic=True,mb=6),
        textw("Deux bâtisseurs. Deux passionnés de la terre.",MUTED,15,mb=10),
        heading("Ils ne cultivaient pas seulement des récoltes — ils cultivaient une vision.",18,CREAM,tag="div",italic=True,weight="400",size_m=16)],
        valign="center",size_t=100,size_m=100),
])
cols4=inner([
    icol(25,[textw(c1)],size_t=50,size_m=100),
    icol(25,[textw(c2)],size_t=50,size_m=100),
    icol(25,[textw(c3)],size_t=50,size_m=100),
    icol(25,[textw(c4)],size_t=50,size_m=100),
])
engagement=sec([col(100,[top,cols4])])

tpl={"version":"0.4","title":"La Maison — Notre Engagement (Frido & Féli)","type":"section",
     "content":[engagement],"page_settings":{"background_background":"classic","background_color":INK}}
with open("la-maison-engagement.json","w",encoding="utf-8") as f:
    json.dump(tpl,f,ensure_ascii=False,indent=1)
def walk(els,ids):
    for e in els: ids.append(e["id"]); walk(e.get("elements",[]),ids)
ids=[]; walk(tpl["content"],ids)
print("la-maison-engagement.json OK · elems=",len(ids),"· IDuniq=",len(set(ids))==len(ids))
