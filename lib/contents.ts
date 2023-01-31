import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import {Obj} from "../utils/type/Obj";


export async function getPostData( id: any, _postsDirectory: string = '/posts') {
    const postsDirectory = path.join(process.cwd(), _postsDirectory)

    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    let processedContent = ''
    await unified()
        .use(remarkParse) // Parse markdown content to a syntax tree
        .use(remarkRehype, {allowDangerousHtml: true}) // Pass raw HTML strings through.
        .use(rehypeStringify, {allowDangerousHtml: true}) // Serialize the raw HTML strings
        .process(matterResult.content)
        .then((file) => {
            processedContent = String(file)
        })
        .catch((error) => {
            throw error
        })
    const createdAt = matterResult?.data?.createdAt?.toString() ?? null
    const contentHtml = processedContent.toString()
    // Combine the data with the id and contentHtml

    console.log('lox loxx', createdAt,
        {
            id,
            contentHtml,
            ...matterResult.data,
            createdAt: matterResult?.data?.createdAt?.toString()
        }
    )

    return {
        id,
        contentHtml,
        ...matterResult.data,
        createdAt: createdAt
    }
}


export async function getSortedPostsData(_postsDirectory: string = '/posts') {
    // Get file names under /posts
    const postsDirectory = path.join(process.cwd(), _postsDirectory)
    const fileNames = fs.readdirSync(postsDirectory)

    console.log(fileNames)
    const allPostsData:Obj[] = []

    for (const [key, val] of Object.entries(fileNames)) {
        const id = val.replace(/\.md$/, '')
        const postData =  await getPostData(id, _postsDirectory)
        allPostsData.push(postData)
    }

    // Sort posts by date
    allPostsData.sort(function compare(a, b) {
        let dateA:any = new Date(a.createdAt);
        let dateB:any = new Date(b.createdAt);
        return dateB - dateA;
    });

    return allPostsData
}

export function getAllPostIds(_postsDirectory: string = '/posts') {
    const postsDirectory = path.join(process.cwd(), _postsDirectory)

    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}
