import RSS from 'rss'
import { headers } from 'next/headers'

import { BLOG_TITLE, BLOG_DESC } from '@/constants'
import { getBlogPostList } from '@/helpers/file-helpers'

export async function GET() {
    const feed = new RSS({
        title: BLOG_TITLE,
        description: BLOG_DESC,
    })
    const blogPosts = await getBlogPostList()
    const host = headers().get('host') // get host domain name

    blogPosts.forEach(post => feed.item({
        title: post.title,
        description: post.abstract,
        date: post.publishedOn,
        url: `${host}/${post.slug}`
    }))

    // return a Response object with content-type header
    // can't return just feed.xml(), also can't stringify it to see actual text
    // return JSON.stringify(feed.xml({indent: true})) // doesn't work
    // need to add application/xml content type
    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}