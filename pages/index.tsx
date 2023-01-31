import React from "react";
import Blank from '../components/layouts/blank'
import MainLayout from '../components/layouts/mainLayout'
import Title from "../components/commons/about/title";
import List from "../components/commons/list";
import {getAllPostIds, getPostData, getSortedPostsData} from '../lib/contents'
import TimelineList from "../components/commons/timelineList";

// @ts-ignore
export default function Index({shortIntro, skills, educationsBackground, workingExperience, projects}) {
    return (
        <Blank>
            <MainLayout>
                <div className={'tilt'}>
                    <div className="md:container md:mx-auto"
                    >
                        <Title/>
                    </div>
                    <div className="md:container md:mx-auto"
                    >
                        <List content={shortIntro.contentHtml} title={shortIntro.title}/>
                    </div>
                    <div data-aos="fade-up" data-aos-easing="fade-down">
                        <TimelineList listTitle={'01'} title="EDUCATION BACKGROUND" contents={educationsBackground} />
                    </div>
                    <div data-aos="fade-up" data-aos-easing="fade-down">
                        <List listTitle={'02'} title="SKILLS" content={skills.contentHtml} />
                    </div>
                    <div data-aos="fade-up" data-aos-easing="fade-down">
                        <TimelineList listTitle={'03'} title="WORKING EXPERIENCES" contents={workingExperience} />
                    </div>
                    <div data-aos="fade-up" data-aos-easing="fade-down">
                        <TimelineList listTitle={'04'} title="PROJECTS" contents={projects} />
                    </div>
                </div>
            </MainLayout>
        </Blank>
    )
}

export async function getStaticProps() {
    // const allPostsData = getSortedPostsData()


    // let shortIntro;
    // let skills;
    // let educationsBackground;

    let shortIntro = await getPostData('shortIntro', '/content/en/text/')
    let skills = await getPostData('index', '/content/en/skill/')
    let educationsBackground = await getSortedPostsData('/content/en/education')
    let workingExperience = await getSortedPostsData('/content/en/working_experience')
    let projects = await getSortedPostsData('/content/en/projects')


    await Promise.all([
        shortIntro,
        skills,
        educationsBackground,
        workingExperience,
        projects
    ])

    return {
        props: {
            shortIntro,
            skills,
            educationsBackground,
            workingExperience,
            projects
        }
    }
}

// export default Index
