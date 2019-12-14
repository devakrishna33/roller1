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
import moment from "moment";
import { Project } from "../../interfaces";
import { ALL_PROJECTS } from "../../contexts/apollo/queries";
import { DELETE_PROJECT } from "../../contexts/apollo/mutations";
import SideNav from "../SideNav";
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
  console.log(moment(data?.projects?.[0]?.updatedAt).format("Do MMM YYYY"));
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
    <Layout>
      <SideNav />
      <Layout style={{ margin: "auto", maxWidth: "80%" }}>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0
          }}
        >
          <Title>All Projects</Title>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Row>
              {data?.me?.projects?.map(
                ({ name, description, thumbnail, id, updatedAt }: Project) => (
                  <Col span={8}>
                    <EditProject
                      open={editId == id}
                      handleClose={setEditId}
                      name={name}
                      description={description}
                      thumbnail={thumbnail}
                      id={id}
                    />
                    <Card
                      style={{ width: 300 }}
                      cover={
                        <img
                          alt="example"
                          src={
                            thumbnail ||
                            "https://www.sketchappsources.com/resources/source-image/detailed-world-map.png"
                          }
                        />
                      }
                      actions={[
                        <Icon type="setting" key="setting" />,
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
                      <Meta title={name} description={description} />
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
