import { Client } from '@notionhq/client';

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const DATABASE_PROPERTIES = {
    NAME: 'Name',
    DESCRIPTION: 'Description',
    MULTI_SELECT: '다중 선택',
    WORK_PERIOD: 'WorkPeriod',
    GITHUB: 'Github'
};

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
                    { property: DATABASE_PROPERTIES.NAME, title: { is_not_empty: true } },
                    { property: DATABASE_PROPERTIES.DESCRIPTION, rich_text: { is_not_empty: true } },
                    { property: DATABASE_PROPERTIES.MULTI_SELECT, multi_select: { is_not_empty: true } },
                ]
            },
            sorts: [{ property: DATABASE_PROPERTIES.NAME, direction: 'ascending' }],
        });

        const projects = response.results.map(project => ({
            id: project.id,
            slug: project.properties[DATABASE_PROPERTIES.NAME].title[0]?.plain_text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            title: project.properties[DATABASE_PROPERTIES.NAME].title[0]?.plain_text || 'Untitled',
            description: project.properties[DATABASE_PROPERTIES.DESCRIPTION].rich_text[0]?.plain_text || 'No description provided.',
            github: project.properties[DATABASE_PROPERTIES.GITHUB]?.url || null,
            technologies: project.properties[DATABASE_PROPERTIES.MULTI_SELECT].multi_select.map(tech => ({
                name: tech.name,
                color: tech.color,
            })) || [],
            period: project.properties[DATABASE_PROPERTIES.WORK_PERIOD]?.date || null,
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
            title: response.properties[DATABASE_PROPERTIES.NAME].title[0]?.plain_text || 'Untitled',
            description: response.properties[DATABASE_PROPERTIES.DESCRIPTION].rich_text[0]?.plain_text || 'No description provided.',
            github: response.properties[DATABASE_PROPERTIES.GITHUB]?.url || null,
            technologies: response.properties[DATABASE_PROPERTIES.MULTI_SELECT].multi_select.map(tech => ({
                name: tech.name,
                color: tech.color,
            })) || [],
            period: response.properties[DATABASE_PROPERTIES.WORK_PERIOD]?.date || null,
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



