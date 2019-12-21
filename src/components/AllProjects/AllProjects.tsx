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
  message
} from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Project } from "../../interfaces";
import { ALL_PROJECTS } from "../../contexts/apollo/queries";
import { DELETE_PROJECT } from "../../contexts/apollo/mutations";
import Navigation from "../Navigation";
import { ROUTES } from "../../constants";
import { EditProject } from "./";

const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

export default () => {
  const { data, loading } = useQuery(ALL_PROJECTS);
  const [
    deleteProject,
    { loading: deleteLoading, data: deleteData }
  ] = useMutation(DELETE_PROJECT, {
    refetchQueries: [
      {
        query: ALL_PROJECTS
      }
    ]
  });
  const { push } = useHistory();

  console.log(data);

  const [editId, setEditId] = useState("");

  useEffect(() => {
    if (deleteLoading) {
      message.loading({ content: "Action in progress...", key: "delete" });
    } else if (deleteData) {
      message.success({
        content: "Deleted Successfully...",
        key: "delete",
        duration: 2
      });
    }
  }, [deleteLoading]);

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Navigation />
      <Title style={{ textAlign: "center", marginTop: "20px" }}>
        All Projects
      </Title>
      <Layout style={{ margin: "auto", maxWidth: "80%" }}>
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
            <Row>
              {data?.projects?.map(
                ({ title, description, photo, id, updatedAt }: Project) => (
                  <Col span={8}>
                    <EditProject
                      open={editId == id}
                      handleClose={setEditId}
                      title={title}
                      description={description}
                      photo={photo}
                      id={id}
                    />
                    <Card
                      style={{ width: 300 }}
                      cover={
                        <img
                          alt="example"
                          src={
                            photo ||
                            "https://images.unsplash.com/photo-1576834755541-e09aba3fff6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
                          }
                        />
                      }
                      actions={[
                        <Icon
                          type="folder-open"
                          onClick={() => {
                            push(`${ROUTES.PROJECT}?id=${id}`);
                          }}
                        />,
                        <Icon
                          type="edit"
                          key="edit"
                          onClick={() => setEditId(id)}
                        />,
                        <Popconfirm
                          placement="top"
                          title={"Are you sure to delete this project?"}
                          onConfirm={() => {
                            deleteProject({
                              variables: {
                                id
                              }
                            });
                          }}
                          okType="danger"
                          okText="Yes"
                          cancelText="No"
                          icon={
                            <Icon
                              type="delete"
                              twoToneColor="red"
                              theme="twoTone"
                            />
                          }
                        >
                          <Icon type="delete" onClick={() => {}} />
                        </Popconfirm>
                      ]}
                    >
                      <Meta title={title} description={description} />
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
