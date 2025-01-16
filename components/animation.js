'use client'
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

export default function Animation() {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        // 애니메이션 데이터를 불러오는 함수
        const loadAnimation = async () => {
            try {
                const response = await fetch('/animation.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnimationData(data);
            } catch (error) {
                console.error('Error fetching animation.json:', error);
            }
        };

        loadAnimation();
    }, []); // 빈 배열을 사용하여 처음 한 번만 실행되도록 설정

    // 애니메이션 데이터가 아직 로드되지 않았다면 로딩 메시지 표시
    if (!animationData) {
        return <div>Loading animation...</div>;
    }

    // key를 사용하여 매번 새로운 애니메이션을 재시작하게 만듦
    return (
        <Lottie
            key={Date.now()} // 현재 시간을 기준으로 유니크한 key 값을 할당
            loop
            animationData={animationData}
            play
        />
    );
}

