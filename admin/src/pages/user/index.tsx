import { useFetchUsers } from "@/api";
import { IUser } from "@/types";
import { Button, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";

/**
 * 用户页面
 */
const UserPage = () => {
  const { usersData, refetchUsers, isFetchUsersLoading } = useFetchUsers();
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const columns: ColumnsType<IUser> = [
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "20%",
    },
    {
      title: "账号",
      dataIndex: "account",
      key: "account",
      align: "center",
      width: "30%",
    },
    {
      title: "密码",
      dataIndex: "password",
      key: "password",
      align: "center",
      width: "20%",
      render: () => "******",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "30%",
      render: (_, record) => (
        <Space size='middle'>
          <Button type='link'>下拉框</Button>
          <Button type='link'>更改密码</Button>
          <Button type='link' danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setFilteredUsers(
      usersData?.list.filter((user) => user.name.includes(searchValue)) || []
    );
  }, [usersData, searchValue]);

  const onSearch = (val: string) => {
    setSearchValue(val);
  };

  return (
    <div>
      <h2>用户数据</h2>

      <Space style={{ margin: "10px 0" }}>
        <Input.Search
          placeholder='请输入用户名...'
          allowClear
          enterButton='Search'
          onSearch={onSearch}
        />
      </Space>

      <Table
        bordered
        columns={columns}
        loading={isFetchUsersLoading}
        dataSource={filteredUsers}
      />
    </div>
  );
};

export default UserPage;