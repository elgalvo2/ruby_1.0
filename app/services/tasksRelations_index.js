const puppeteer = require('puppeteer')
const {insertTaskInHtml} = require('./taskRelacionTopdf')



const CreateRelationPdf = async (data) =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage()
    await page.goto(__dirname+'/task_relation/task_relation.html',{waitUntil:"networkidle2"});
    const relation = await insertTaskInHtml(page,data)
    const pdf = await relation.pdf({path:"app/services/task_relation.pdf",format:"letter"});
    await browser.close()

    return pdf

    
}

module.exports = {CreateRelationPdf}