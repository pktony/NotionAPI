const { Client } = require("@notionhq/client")

// initialize notion client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

const SORT_DIRECTION = {
    ASCENDING: "ascending",
    DESCENDING: "descending"
}

const queryDatabase = async (database_id) => {
    const pages = await notion.databases.query({
        database_id: database_id,
    })

    console.log(`notionapis : loadDatabase - ${pages.results.length} database lines`)

    const {has_more, next_cursor, results } = pages;
    let resultList = [ ...results ];
    if(has_more)
    {
        await loadDatabaseWithCursor(database_id, next_cursor, resultList)
    }

    return resultList
}

const queryDatabaseWithOrder = async (database_id, property, direction) => {
    const pages = await notion.databases.query({
        database_id: database_id,
        sorts:[{
            "property": property,
            "direction": direction
        }]  
    })
    
    console.log(`notionapis : loadDatabase - ${pages.results.length} database lines`)

    return pages.results
}


const loadDatabaseWithCursor = async (database_id, cursor, results) => {
    const pages = await notion.databases.query({
        database_id: database_id,
        start_cursor: cursor
    })

    if(has_more)
    {
        const newDataList = await loadDatabaseWithCursor(database_id, next_cursor, resultList)
        results.push( ...newDataList )
    }
}

const getCheckbox=(properties, fieldName)=>{
    return properties[fieldName].checkbox
}

const getDateStart=(properties, fieldName)=>{
    return properties[fieldName].date?.start
}

const getDateEnd=(properties, fieldName)=>{
    return properties[fieldName].date?.end
}

const getFileName=(properties, fieldName)=>{
    return properties[fieldName].files[0]?.name
}

const getFileUrl=(properties, fieldName)=>{
    try{
        return properties[fieldName].files[0].file.url
    } catch{
        return undefined
    }
}

const getTitle=(properties, fieldName)=>{
    try{
        return properties[fieldName].title[0].text.content 
    } catch{
        return undefined
    }
}

module.exports={
    queryDatabase,
    queryDatabaseWithOrder,

    getCheckbox,
    getDateStart,
    getDateEnd,
    getFileName,
    getFileUrl,
    getTitle,

    SORT_DIRECTION
}