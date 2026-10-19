import React from "react";
import Blank from '../components/layouts/blank'
import MainLayout from '../components/layouts/mainLayout'
import Title from "../components/commons/about/title";
import List from "../components/commons/list";
import {getPostData, getSortedPostsData} from '../lib/contents'
import TimelineList from "../components/commons/timelineList";

// @ts-ignore
export default function Index({shortIntro, skills, educationsBackground, workingExperience, projects}) {
    return (
        <Blank>
            <MainLayout description="Tnloc — developer and coffee lover. Education, skills, working experience and projects.">
                <div className={'tilt m-4'}>
                    <div className="md:container md:mx-auto"
                    >
                        <Title/>
                    </div>
                    <div className="md:container md:mx-auto"
                    >
                        <List content={shortIntro.contentHtml} title={shortIntro.title}/>
                    </div>
                    <div>
                        <TimelineList listTitle={'01'} title="EDUCATION BACKGROUND" contents={educationsBackground} />
                    </div>
                    <div>
                        <List listTitle={'02'} title="SKILLS" content={skills.contentHtml} />
                    </div>
                    <div>
                        <TimelineList listTitle={'03'} title="WORKING EXPERIENCES" contents={workingExperience} />
                    </div>
                    <div>
                        <TimelineList listTitle={'04'} title="PROJECTS" contents={projects} />
                    </div>
                </div>
            </MainLayout>
        </Blank>
    )
}

export async function getStaticProps() {
    const [shortIntro, skills, educationsBackground, workingExperience, projects] = await Promise.all([
        getPostData('shortIntro', '/content/en/text/'),
        getPostData('index', '/content/en/skill/'),
        getSortedPostsData('/content/en/education'),
        getSortedPostsData('/content/en/working_experience'),
        getSortedPostsData('/content/en/projects'),
    ])
    return {props: {shortIntro, skills, educationsBackground, workingExperience, projects}}
}
