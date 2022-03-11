const puppeteer = require('puppeteer')
const {insertTaskInHtml} = require('./taskRelacionTopdf')
const fs = require('fs');
const { load } = require('dotenv');




const CreateRelationPdf = async (data) =>{

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
    });

    const page = await browser.newPage()
    
    const content = fs.readFileSync(__dirname+'/task_relation/task_relation.html','utf-8');
    await page.setContent(content,{waitUntil:['load','networkidle2']});

    const relation = await insertTaskInHtml(page,data)

    const pdf = await relation.pdf({path:"app/controllers/task_relation.pdf",format:"letter"});
    
    await browser.close()

    return pdf

    
}

module.exports = {CreateRelationPdf}