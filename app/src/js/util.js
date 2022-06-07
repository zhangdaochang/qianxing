let AppBackground = document.querySelector('body')
let SiteList = document.querySelector('.siteList')
function setBackground(url){
    let status = true;
    let img = new Image()
    img.onerror = function(){
        toast('图片错误！！请检查')
    }
    img.src=url;

    if(status){
        AppBackground.style= `background:url(${url});background-size: cover;background-attachment: fixed;`
    }
}


function createSite(siteName,url,index){
    let siteTelement = `
<div class="site" url= ${url} index=${index}>
    <div class="siteLogo">
        <img src="//${new URL(url).host}/favicon.ico" alt="">
    </div>
    <div><span class="siteText">${siteName}</span></div>
</div>
`
    let temp = document.createElement('template')
    temp.innerHTML = siteTelement.trim()
    SiteList.children[0].before(temp.content.firstChild)
}

function createSerach(serachName,serachUrl,index){
    let siteTelement = `
    <div index=${index} style="display: inline;">
       <span> ${serachName}</span><input type="radio" name="serchList" value='${serachUrl}'/>
    </div>
    `
    let temp = document.createElement('template')
    temp.innerHTML = siteTelement.trim()
    document.querySelector('#QieChecked').children[0].before(temp.content.firstChild)
}

function addAppSite(name,url){
    let pattern =new RegExp("^(http[s]{0,1}://)")
    if(pattern.test(url)){
        let index = appSiteList.push({siteName:name,siteUrl:url})
        createSite(name,url,index)
        toast('收藏成功')
    }else{
        toast('请填写完整的url')
    }
    
}
function addAppSrarch(name,url){
    let index = globalAppConfig.serchList.push({serchName:name,serchUrl:url})
    createSerach(name,url,index)
}

function LongClick(nodeL,fn){
    let longStart,longEnd,timer;
    nodeL.addEventListener('touchstart',(e)=>{
        longStart = new Date()
        timer = setTimeout(function (){
            fn(e,nodeL)
        }, 700)

    })
    
    nodeL.addEventListener('touchend',(e)=>{
        longEnd = new Date()
        if(longEnd-longStart<700){
            clearTimeout(timer)
        }
    })
    
    nodeL.addEventListener('mousedown',(e)=>{
        longStart = new Date()
        timer = setTimeout(function (){
            fn(e,nodeL)
        }, 700)
    })
    nodeL.addEventListener('mouseup',(e)=>{
        longEnd = new Date()
        if(longEnd-longStart<700){
            clearTimeout(timer)
        }
    })
}

function toast(message){
    let toast = document.querySelector('.toast')
    toast.querySelector('p').innerText=message
    toast.style='display:block'
    setTimeout(()=>{
        toast.style='display:none'
    },800)
}

/*
* 字符串相似度比较
*  @param1 字符串1
*  @parma2 字符串2
*  @return 相似度百分比
*/

function strSimilar(str1,str2){
    let similar = 0
    str1 = str1.toLocaleLowerCase()
    str2 = str2.toLocaleLowerCase()
    for(let i = 0;i<str1.length;i++){
        str2.indexOf(str1[i]) !== -1 ? similar++ : similar
    }
    return similar/Math.max(str1.length,str2.length)
}

/*
作者：薄荷前端
链接：https://juejin.cn/post/6844903669389885453
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
function debounce(fun, delay) {
    return function (args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}