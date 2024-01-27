require('dotenv').config()

const { queryDatabase, queryDatabaseWithOrder, 
    SORT_DIRECTION, getCheckbox,
     getTitle, getFileUrl, getDateStart, getDateEnd, getFileName } = require("./notionapi/notionapi");

// console.log(`dotenv : ${process.env.NOTION_TOKEN}`)

const databaseId = "6b34b1e6832c4c87b5cefc7bbbc90ea3"
const testOrder = async()=>{
    const database = await queryDatabase(databaseId);
    
    const databaseOrder = await queryDatabaseWithOrder(databaseId, '선택', SORT_DIRECTION.DESCENDING)
    
    console.log('############## database without order')
    database.forEach(x => {
        console.log(x.properties['선택'].select)
    })
    console.log('############## database with order')
    databaseOrder.forEach(x => {
        console.log(x.properties['선택'].select)
    })

    console.log('done loading databse!')
}

const testDatabaseProperties=async()=>{
    const database = await queryDatabase(databaseId);

    database.forEach(result => {
        const checkbox = getCheckbox(result.properties, "체크박스")
        console.log(`checkbox: ${checkbox}`)

        const title = getTitle(result.properties, "Title")
        console.log(`title: ${title}`)

        const fileName = getFileName(result.properties, "파일과 미디어")
        const fileUrl = getFileUrl(result.properties, "파일과 미디어")
        console.log(`fileUrl: ${fileName} -- ${fileUrl}`)

        const dateStart = getDateStart(result.properties, "날짜")
        const dateEnd = getDateEnd(result.properties, "날짜")
        console.log(`Date: ${dateStart} ~ ${dateEnd}`)

        console.log('-----------------------------------------')
    })
}

// testOrder();

testDatabaseProperties();