import React from 'react'
import { Form, Button, Input, Checkbox, Tooltip } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { useModel, useIntl } from 'umi'
import { pick } from '@/helpers'

import styles from './index.less'

const setTheme = (theme: string) => {
  let styleLink = document.getElementById('theme-style') as HTMLLinkElement
  let body = document.getElementsByTagName('body')[0]
  if (styleLink) {
    // If there is a link tag with id theme-style, modify its href directly
    styleLink.href = `/theme/${theme}.css` // 切换 antd 组件主题
    body.className = `body-wrap-${theme}` // 切换自定义组件的主题
  } else {
    // If it does not exist, create a new one
    styleLink = document.createElement('link')
    styleLink.type = 'text/css'
    styleLink.rel = 'stylesheet'
    styleLink.id = 'theme-style'
    styleLink.href = `/theme/${theme}.css`
    body.className = `body-wrap-${theme}`
    document.body.append(styleLink)
  }
}

export default function AccountPane() {
  const { formatMessage } = useIntl()
  const { isRememberme, toggleRememberme, login } = useModel('useLoginModel', m =>
    pick(m, 'isRememberme', 'toggleRememberme', 'login')
  )

  return (
    <Form
      name="account_login"
      initialValues={{ remember: isRememberme }}
      onFinish={vals => {
        login(vals.account, vals.password)
      }}
    >
      <Form.Item
        name="account"
        rules={[{ required: true, message: formatMessage({ id: 'LOGIN_ACCOUNT_REQUIRED_MSG' }) }]}
      >
        <Input prefix={<UserOutlined />} placeholder={formatMessage({ id: 'LOGIN_ACCOUNT_PLACEHOLDER' })} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: formatMessage({ id: 'LOGIN_PASSWORD_REQUIRED_MSG' }) }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={formatMessage({ id: 'LOGIN_PASSWORD_PLACEHOLDER' })}
        />
      </Form.Item>
      <Form.Item className={styles.rememberContainer}>
        <Checkbox onChange={toggleRememberme}>{formatMessage({ id: 'LOGIN_REMEMBER' })}</Checkbox>

        <Tooltip title={formatMessage({ id: 'LOGIN_FORGET_PASSWORD_TIP' })}>
          <span className={styles.forgetPwd}>{formatMessage({ id: 'LOGIN_FORGET_PASSWORD' })}</span>
        </Tooltip>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.signinBtn}>
          {formatMessage({ id: 'LOGIN_SIGNIN_BTN' })}
        </Button>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          onClick={e => {
            setTheme('dark')
          }}
        >
          dark
        </Button>
        <Button
          type="primary"
          onClick={e => {
            setTheme('light')
          }}
        >
          light
        </Button>
      </Form.Item>
    </Form>
  )
}
