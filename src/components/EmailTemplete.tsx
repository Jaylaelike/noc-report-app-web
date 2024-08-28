
import {
  Body,

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


export const EmailTemplates = ({
  posting_date,
  station_name,
  Facility_name,
  detail_data,
  start_time,
  end_time,
  sum_time,
}: EmailTemplates) => {


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



const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};



const boxInfos = {
  padding: "20px",
};


