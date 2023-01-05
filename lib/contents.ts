import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import path from "path";
import fs from "fs";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), '/content')

export async function getPostData(id: any) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    console.log('fullPath',fullPath)
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
    const contentHtml = processedContent.toString()
    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}
