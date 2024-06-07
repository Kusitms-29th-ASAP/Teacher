"use client";

import authAxios from "@/apis/authAxios";
import Calendar from "@/components/common/Calendar";
import ListBoxComponent from "@/components/common/ListItem";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const weekDays = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

const ClassAnnouncement = () => {
  const [writeDate, setWriteDate] = useState("");
  const [name, setName] = useState("김동우");
  const [announcementDetails, setAnnouncementDetails] = useState([
    {
      description: "",
      isLinkedWithTodo: false,
      todoType: "NONE",
      deadline: "2024-05-26",
    },
    {
      description: "",
      isLinkedWithTodo: false,
      todoType: "HOMEWORK",
      deadline: "2024-05-31",
    },
    {
      description: "",
      isLinkedWithTodo: false,
      todoType: "SUPPLY",
      deadline: "2024-05-31",
    },
  ]);

  const handleWriteDateChange = (value: string) => {
    setWriteDate(value);
  };

  function getFormattedDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const dayOfWeek = weekDays[today.getDay()];

    return `${month}월 ${date}일 ${dayOfWeek}`;
  }

  const handleShareKakaoClick = () => {
    const { Kakao, location } = window;
    const todayFormatted = getFormattedDate();

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${todayFormatted}, ${name} 학생의 알림장이 게시되었습니다. 지금 바로 확인해보세요!`,
        imageUrl:
          "https://kr.object.ncloudstorage.com/school-point/default_image/kakao_alarm.png",
        link: {
          mobileWebUrl: "https://www.schoolpoint.site",
          webUrl: "https://www.schoolpoint.site",
        },
      },
      buttons: [
        {
          title: "알림장 바로가기",
          link: {
            mobileWebUrl: "https://www.schoolpoint.site",
            webUrl: "https://www.schoolpoint.site",
          },
        },
      ],
    });
  };

  const handleAddAnnouncement = () => {
    setAnnouncementDetails([
      ...announcementDetails,
      {
        description: "",
        isLinkedWithTodo: false,
        todoType: "SCHOOL_ANNOUNCEMENT",
        deadline: "",
      },
    ]);
  };

  const handleSaveClick = () => {
    const dataToSend = {
      announcementDetails: announcementDetails,
      writeDate: writeDate,
    };
    console.log(dataToSend);
    authAxios
      .post("/api/v1/classrooms/announcements", dataToSend)
      .then((response) => {
        const result = response.data;
        alert("변경사항 저장 완료");
      });
  };

  const handleListBoxChange = (updatedItems: any) => {
    setAnnouncementDetails(updatedItems);
  };

  return (
    <>
      <Title>알림장</Title>
      <WriteDate>
        <Text>작성일자</Text>
        <Calendar value={writeDate} onChange={handleWriteDateChange} />
      </WriteDate>

      <ListBox>
        <Head>
          <div>설명</div>
          <div>학부모 투두 연동 여부</div>
          <div>카테고리</div>
          <div>마감기한 설정</div>
        </Head>
        <ListBoxComponent
          items={announcementDetails}
          onChange={handleListBoxChange}
          setValue={setAnnouncementDetails}
        />
        <Foot>
          <AddButton onClick={handleAddAnnouncement}>
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
            <Save onClick={handleSaveClick}>변경사항 저장하기</Save>
          </Gap>
        </Foot>
      </ListBox>
    </>
  );
};

export default ClassAnnouncement;

const Title = styled.div`
  color: ${theme.colors.b800};
  ${(props) => props.theme.fonts.heading1_b};
  margin-bottom: 24px;
`;

const WriteDate = styled.div`
  padding: 12px 20px;
  border-radius: 16px;
  background: ${theme.colors.white};
  margin-bottom: 16px;
`;

const Text = styled.div`
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.body3_m};
  margin-bottom: 10px;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 700px;
  padding: 20px 30px;
  gap: 10px;
  border-radius: 16px;
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
  white-space: nowrap;
`;

const AddButton = styled.div`
  display: flex;
  width: 168px;
  height: 32px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #ff7c00;
  background: #ffe5cd;
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
  cursor: pointer;
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
  cursor: pointer;
`;

//   return (
//     <>
//       <Title>알림장</Title>
//       <WriteDate>
//         <Text>작성일자</Text>
//         <Calendar value={date} onChange={handleDateChange} />
//       </WriteDate>

//       <ListBox>
//         <Head>
//           <div>설명</div>
//           <div>학부모 투두 연동 여부</div>
//           <div>카테고리</div>
//           <div>마감기한 설정</div>
//         </Head>
//         <ListItem />
//         <Foot>
//           <AddButton>
//             <Image
//               src="/assets/icons/ic_plus.svg"
//               alt="calendar"
//               width={24}
//               height={24}
//             />
//             알림장 추가하기
//           </AddButton>
//           <Gap>
//             <Send onClick={handleShareKakaoClick}>
//               카카오톡으로 알림장 보내기
//             </Send>
//             <Save onClick={handleSaveClick}>변경사항 저장하기</Save>
//           </Gap>
//         </Foot>
//       </ListBox>
//     </>
//   );
// };
{
  /* <ListBoxComponent
      items={announcementDetails}
      onChange={handleListBoxChange}
    />
    <ListBoxComponent
      items={announcementDetails}
      onChange={handleListBoxChange}
    /> */
}
