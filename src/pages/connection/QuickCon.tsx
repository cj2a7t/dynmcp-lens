import type { FormProps } from 'antd';
import { Button, Flex, Form, Input, Select } from 'antd';
import { invoke } from '@tauri-apps/api/core';
import { ConnectionData } from '@/store/connection';
import { useNavigate } from 'umi';
import { LinkOutlined, StarOutlined } from '@ant-design/icons';


const { Option } = Select;
export default () => {

  const navigate = useNavigate()

  const onFinish: FormProps<ConnectionData>['onFinish'] = async (val) => {
    await invoke("save_apisix_connection", {
      "name": val.name,
      "host": val.host,
      "adminKey": val.admin_key
    })
    navigate('/favorites')
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 90 }} defaultValue={"http"}>
        <Option value="https">https</Option>
        <Option value="http">http</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Flex
      justify='center'
      align='center' // 垂直居中
      style={{ height: '75vh' }} // 设置高度为视口高度
    >
      <div style={{
        width: '100%',
        height: 260,
        maxWidth: 600,
        padding: 35,
        backgroundColor: "#fafafa",
        boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)', // 添加一点阴影效果
      }}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >

          <Form.Item<ConnectionData>
            label="Connection Name"
            name="name"
            rules={[{ required: true, message: 'Please input connection name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<ConnectionData>
            label="Host"
            name="host"
            rules={[{ required: true, message: 'Please input APISIX host!' }]}
          >
            <Input addonBefore={prefixSelector} />
          </Form.Item>

          <Form.Item<ConnectionData>
            label="Admin Key"
            name="admin_key"
            rules={[{ required: true, message: 'Please input APISIX admin key!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
            <Button size='small' style={{ width: 100 }} color="danger" variant='solid' >
              <StarOutlined />
              star
            </Button>
            <Button size='small' style={{ width: 100, marginLeft: 32 }} htmlType='submit' color="primary" variant='solid' >
              <LinkOutlined />
              connect
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Flex>
  );
}