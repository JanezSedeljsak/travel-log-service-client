import React, { useEffect, useState } from 'react';
import PaperPlane from '../Components/PaperPlane';
import Banner from './../assets/banner.jpg';
import { loadMostActiveuMembers, loadTopDestinations } from '../api';
import { Row, Col, List, Avatar } from 'antd';

export default () => {
    const [topMembers, setTopMembers] = useState([]);
    const [topLocations, setTopLocations] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setTopMembers(await loadMostActiveuMembers());
        setTopLocations(await loadTopDestinations());
    }

    return (
        <>
            <div id="landing">
                <img id="banner-img" src={Banner} />
                <PaperPlane />
                <p>~ Pass on the beautiful memories you've made around the world ~</p>
                <div id="landing-container">
                    <div id="landing-container-title">
                        <h1>Travel log</h1>
                    </div>
                    <Row>
                        <Col span={12}>
                            <h1 className="blu-title">Top members</h1>
                            <List
                                itemLayout="horizontal"
                                dataSource={topMembers}
                                renderItem={member => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                            title={member.fullName}
                                            description={member.email}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            <h1 className="blu-title">Top locations</h1>
                            <List
                                itemLayout="horizontal"
                                dataSource={topLocations}
                                renderItem={destination => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                            title={destination.name}
                                            description={destination.country}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </>

    )
}