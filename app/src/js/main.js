const appExpand = document.querySelector('.logo')
const appSite = document.querySelector('.siteList')
const y = JSON.parse(localStorage.getItem('y'))
const x = JSON.parse(localStorage.getItem('x'))
console.log(x,y)
const globalAppConfig = {
    backgroundImg:(y !== null)? y.backgroundImg : '',
    serchList:(y !== null)? y.serchList : [
        {serchName:'必应',serchUrl:'https://cn.bing.com/search?q='}
    ]
}

const appSiteList = x.length !== 0 ? x : [
    {siteName:'酷狗',siteUrl:'https://www.kugou.com/'},
    {siteName:'bilibli',siteUrl:'https://www.bilibili.com/'},
    {siteName:'MDN',siteUrl:'https://developer.mozilla.org'}
]

!function(){
    if (x===null){
        const appSiteList =[
            {siteName:'酷狗',siteUrl:'https://www.kugou.com/'},
            {siteName:'bilibli',siteUrl:'https://www.bilibili.com/'},
            {siteName:'MDN',siteUrl:'https://developer.mozilla.org'}
        ]
        let SiteString = JSON.stringify(appSiteList)
        localStorage.setItem('x',SiteString)    
    }
    localStorage.getItem('isFrist') === null ? document.querySelector('.global').style = 'display:block' : ''
    document.querySelector('body').style.height=window.innerHeight+'px';
    if(globalAppConfig.backgroundImg !== ''){
        setBackground(globalAppConfig.backgroundImg)
    }
    appSiteList.forEach((v,k)=>{
        createSite(v.siteName,v.siteUrl,k)
    })
    globalAppConfig.serchList.forEach((v,k)=>{
        createSerach(v.serchName,v.serchUrl,k)
    })
}();

LongClick(appExpand,(e)=>{
    document.querySelector('.global').style.display === 'none' || document.querySelector('.global').style.display === ''? document.querySelector('.global').style = 'display:block' : document.querySelector('.global').style='display:none'
})
LongClick(appSite,(e,parent)=>{
    if(e.target.nodeName === 'IMG' || e.target.nodeName === 'SPAN'){
        e.target.parentNode.parentNode.remove()
    }
    appSiteList.splice(e.target.parentNode.getAttribute('index'),1)
})
LongClick(document.querySelector('#QieChecked'),(e,parent) =>{
    if(e.target !== parent){
        e.target.parentNode.remove()
    }
    globalAppConfig.serchList.splice(e.target.parentNode.getAttribute('index'),1)
})

appSite.onclick=(e)=>{
    if(e.target.parentNode.parentNode.getAttribute('url') != null){
        window.location=e.target.parentNode.parentNode.getAttribute('url')
    }
}

window.onbeforeunload = ()=>{
    let SiteString = JSON.stringify(appSiteList)
    let SerachString = JSON.stringify(globalAppConfig)
    localStorage.setItem('x',SiteString)
    localStorage.setItem('y',SerachString)
    localStorage.setItem('isFrist','1')
}
setHtmlBackground.addEventListener('click',()=>{
    setBackground(document.querySelector("input[name=backgrond]").value)
    globalAppConfig.backgroundImg=document.querySelector("input[name=backgrond]").value
    toast('图片设置成功')
})

addSite.onclick = ()=>{
    addAppSite(document.querySelector("input[name=appName]").value,document.querySelector("input[name=appUrl]").value)
}

addSerach.onclick =()=>{
    addAppSrarch(document.querySelector("input[name=searcName]").value,document.querySelector("input[name=searcUrl]").value)
    toast('添加搜索引擎成功')
}

serach.addEventListener('keydown',(e)=>{
    e.stopPropagation();
    if(e.key==='Enter'){
        try {
            window.location = document.querySelectorAll("#QieChecked > div > input[type=radio]:checked")[0].value + document.querySelector("#serach").value
        } catch (error) {
            toast('没有默认搜索引擎，请重新设置引擎')
        }
    } 
})

document.addEventListener('keydown',(e)=>{  
    let {key} = e
    appSiteList.forEach((e)=>{
        if(strSimilar(key,e.siteName) !== 0){
            window.location = e.siteUrl
        }
    })
    
})
