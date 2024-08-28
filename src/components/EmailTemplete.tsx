
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplates {
  posting_date: string;
  station_name: string;
  Facility_name: string;
  detail_data: string;
  start_time: string;
  end_time: string;
  sum_time: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const EmailTemplates = ({
  posting_date,
  station_name,
  Facility_name,
  detail_data,
  start_time,
  end_time,
  sum_time,
}: EmailTemplates) => {
  //   const formattedDate = new Intl.DateTimeFormat("th", {
  //     dateStyle: "long",
  //     timeStyle: "short",
  //   }).format(posting_date);

  return (
    <Html>
      <Head />
      <Preview>NOC Email Report</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <img
              src="https://res.cloudinary.com/satjay/image/upload/v1705293483/ptzmq3vg2zb4i9wqi8xy.jpg"
              alt=""
              height="100"
              width="100"
            />
          </Section>

          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  แจ้งเหตุขัดข้องในการให้บริการฯ
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  รายงานสรุปเวลการหยุดออกอากาศ
                </Heading>

                <Text style={paragraph}>
                  <b>วันที่บันทึก :{posting_date}</b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>
                    สถานี:
                    {station_name}
                  </b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>
                    ผู้ให้บริการ:
                    {Facility_name}
                  </b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>
                    รายละเอียดเหตุการณ์:
                    {detail_data}
                  </b>
                </Text>

                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>เวลาเริ่มต้นออกอากาศไม่ได้</th>
                      <th>เวลาสิ้นสุดออกอากาศไม่ได้</th>
                      <th>รวมเวลาออกหยุดออกอากาศ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{start_time}</td>
                      <td>{end_time}</td>
                      <td>{sum_time}</td>
                    </tr>
                  </tbody>
                </table>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 | engineering thaipbs license
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// EmailTemplates.PreviewProps = {
//   userFirstName: "Alan",
//   loginDate: new Date("September 7, 2022, 10:58 am"),
//   loginDevice: "Chrome on Mac OS X",
//   loginLocation: "Upland, California, United States",
//   loginIp: "47.149.53.167",
// } as EmailTemplates;

export default EmailTemplates;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

// const containerButton = {
//   display: "flex",
//   justifyContent: "center",
//   width: "100%",
// };

// const button = {
//   backgroundColor: "#e00707",
//   borderRadius: 3,
//   color: "#FFF",
//   fontWeight: "bold",
//   border: "1px solid rgb(0,0,0, 0.1)",
//   cursor: "pointer",
//   padding: "12px 30px",
// };

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

// const image = {
//   maxWidth: "100%",
// };

const boxInfos = {
  padding: "20px",
};

// const containerImageFooter = {
//   padding: "45px 0 0 0",
// };
