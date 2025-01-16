import { Client } from '@notionhq/client';

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export async function getProjects() {
    const { NOTION_TOKEN, NOTION_DATABASE_ID } = process.env;

    if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
        throw new Error('Missing required environment variables: NOTION_TOKEN or NOTION_DATABASE_ID');
    }

    try {
        const response = await notion.databases.query({
            database_id: NOTION_DATABASE_ID,
            filter: {
                and: [
                    { property: 'Name', title: { is_not_empty: true } },
                    { property: 'Description', rich_text: { is_not_empty: true } },
                    { property: "다중 선택", multi_select: { is_not_empty: true } },
                ]
            },
            sorts: [{ property: 'Name', direction: 'ascending' }],
        });

        const projects = response.results.map(project => ({
            id: project.id,
            slug: project.properties.Name.title[0]?.plain_text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            title: project.properties.Name.title[0]?.plain_text || 'Untitled',
            description: project.properties.Description.rich_text[0]?.plain_text || 'No description provided.',
            github: project.properties.Github?.url || null,
            technologies: project.properties["다중 선택"].multi_select.map(tech => ({
                name: tech.name,
                color: tech.color,
            })) || [],
            period: project.properties.WorkPeriod?.date || null,
            coverImage: project.cover?.external?.url || null,
        }));

        return projects;
    } catch (error) {
        console.error('[Server] Error fetching projects:', error);
        throw error;
    }
}

export async function getProjectById(id) {
    if (!process.env.NOTION_TOKEN) {
        throw new Error('Missing Notion token');
    }

    try {
        const response = await notion.pages.retrieve({ page_id: id });

        const project = {
            id: response.id,
            title: response.properties.Name.title[0]?.plain_text || 'Untitled',
            description: response.properties.Description.rich_text[0]?.plain_text || 'No description provided.',
            github: response.properties.Github?.url || null,
            technologies: response.properties["다중 선택"].multi_select.map(tech => ({
                name: tech.name,
                color: tech.color,
            })) || [],
            period: response.properties.WorkPeriod?.date || null,
            coverImage: response.cover?.external?.url || null,
        };

        return project;
    } catch (error) {
        console.error('[Server] Error fetching project by ID:', error);
        return null;
    }
}

export async function getProjectBySlug(slug) {
    try {
        const projects = await getProjects();
        const project = projects.find(p => p.slug === slug);
        return project ? await getProjectById(project.id) : null;
    } catch (error) {
        console.error('[Server] Error fetching project by slug:', error);
        return null;
    }
}
