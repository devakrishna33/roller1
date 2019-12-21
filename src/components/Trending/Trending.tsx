import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Icon,
  Spin,
  Row,
  Col,
  Popconfirm,
  message,
  Switch
} from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Project } from "../../interfaces";
import { TRENDING_PROJECTS, ALL_PROJECTS } from "../../contexts/apollo/queries";
import {
  DELETE_PROJECT,
  MARK_PROJECT_COMPLETED
} from "../../contexts/apollo/mutations";
import Navigation from "../Navigation";
import { ROUTES } from "../../constants";
import { EditProject } from "./";

const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

export default () => {
  const { data, loading } = useQuery(TRENDING_PROJECTS);
  const [
    markComplete,
    { loading: markCompleteLoading, data: markCompleteData }
  ] = useMutation(MARK_PROJECT_COMPLETED, {
    refetchQueries: [
      {
        query: ALL_PROJECTS
      }
    ]
  });
  const { push } = useHistory();

  const [editId, setEditId] = useState("");

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Navigation />
      <Title style={{ textAlign: "center", marginTop: "20px" }}>
        All Projects
      </Title>
      <Layout style={{ margin: "auto", maxWidth: "100%" }}>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0
          }}
        >
          {loading ? (
            <Spin size="large" />
          ) : (
            <Row style={{ width: "100vw" }}>
              {data?.projects?.map(
                ({
                  title,
                  description,
                  photo,
                  id,
                  updatedAt,
                  status
                }: Project) => (
                  <Col span={6}>
                    <EditProject
                      open={editId == id}
                      handleClose={setEditId}
                      title={title}
                      description={description}
                      photo={photo}
                      id={id}
                    />
                    <Card
                      style={{ margin: "4%", width: "300px" }}
                      cover={
                        <img
                          alt="example"
                          src={
                            photo ||
                            "https://images.unsplash.com/photo-1576834755541-e09aba3fff6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
                          }
                          style={{ height: 300 }}
                        />
                      }
                      actions={[
                        <Icon
                          type="edit"
                          key="edit"
                          onClick={() => setEditId(id)}
                        />,
                        <Popconfirm
                          placement="top"
                          title={"This will mark this project as complete?"}
                          onConfirm={() => {
                            markComplete({
                              variables: {
                                id
                              }
                            });
                          }}
                          okType="dashed"
                          okText="Yes"
                          cancelText="No"
                          icon={
                            <Icon
                              type="delete"
                              twoToneColor="green"
                              theme="twoTone"
                            />
                          }
                        >
                          <Icon
                            type="check"
                            style={
                              status === "COMPLETE"
                                ? { backgroundColor: "green", color: "white" }
                                : {}
                            }
                          />
                        </Popconfirm>
                      ]}
                    >
                      <Meta
                        title={title}
                        description={description?.substr(0, 60)}
                      />
                      <br />
                      {moment(updatedAt).format("Do MMM YYYY")}
                    </Card>
                  </Col>
                )
              )}
            </Row>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
