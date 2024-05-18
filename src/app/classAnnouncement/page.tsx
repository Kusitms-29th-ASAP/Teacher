"use client";

import Calendar from "@/components/common/Calendar";
import ListItem from "@/components/common/ListItem";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ClassAnnouncement = () => {
  const [date, setDate] = useState("");

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  const handleShareKakaoClick = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title:
          "4월 22일 월요일, 김동우 학생의 알림장이 게시되었습니다. 지금 바로 확인해보세요!",
        imageUrl:
          "https://kr.object.ncloudstorage.com/school-point/default_image/kakao_alarm.png",
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      },
      buttons: [
        {
          title: "알림장 바로가기",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com",
          },
        },
      ],
    });
  };

  return (
    <div>
      <Title>알림장</Title>
      <WriteDate>
        <Text>작성일자</Text>
        <Calendar value={date} onChange={handleDateChange} />
      </WriteDate>
      <ListBox>
        <Head>
          <div>설명</div>
          <div>학부모 투두 연동 여부</div>
          <div>카테고리</div>
          <div>마감기한 설정</div>
        </Head>
        <ListItem />
        <ListItem />
        <ListItem />
        <Foot>
          <AddButton>
            <Image
              src="/assets/icons/ic_plus.svg"
              alt="calendar"
              width={24}
              height={24}
            />
            알림장 추가하기
          </AddButton>
          <Gap>
            <Send onClick={handleShareKakaoClick}>
              카카오톡으로 알림장 보내기
            </Send>
            <Save>변경사항 저장하기</Save>
          </Gap>
        </Foot>
      </ListBox>
    </div>
  );
};

export default ClassAnnouncement;

const Title = styled.div`
  color: ${theme.colors.b800};
  ${(props) => props.theme.fonts.heading1_b};
`;

const WriteDate = styled.div`
  width: 377px;
  /* height: 44px; */
  padding: 12px 20px;
  border-radius: 16px;
  background: ${theme.colors.white};
`;

const Text = styled.div`
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.body3_m};
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  color: ${theme.colors.b400};
  ${(props) => props.theme.fonts.body3_m};
  background: ${theme.colors.white};
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr 1fr 1fr;
  gap: 30px;
  white-space: nowrap;
`;

const Foot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.div`
  display: flex;
  width: 168px;
  height: 32px;
  padding: 8px 16px 8px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #ff7c00;
  background: #ffe5cd;
  margin-top: 20px;
  transition: color 200ms, background-color 200ms;
  cursor: pointer;

  &:active {
    background: ${theme.colors.primary200};
  }
`;

const Gap = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Send = styled.div`
  text-align: center;
  color: ${theme.colors.primary500};
  ${(props) => props.theme.fonts.body3_b};
`;

const Save = styled.div`
  display: flex;
  width: 218px;
  height: 44px;
  padding: 16px 28px;
  border-radius: 10px;
  background: ${theme.colors.primary500};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.body3_b};
`;
