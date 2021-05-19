# 前端脚手架项目

#### 安装

```shell
npm install @lydxwj/da-cli -g
```

#### 开发

```shell
git clone https://github.com/lydxwj/da-cli.git
# 或者下载解压
https://github.com/lydxwj/da-cli/archive/refs/heads/master.zip

cd ./da-cli
npm install

# 安装完依赖之后执行
npm link
```

#### 命令

打开命令行工具

- **增加模板**

  ```shell
  da add
  ```

  **步骤示例**：(本项目地址`https://github.com/lydxwj/da-cli`)

  - ？请输入模板名称(英文字母)   cli

  - ？请选择模板仓库地址类型:  github

    》github

    ​    gitlab

  - ？请输入仓库所属   lydxwj

  - ？请输入仓库名  da-cli

- **删除模板**

  ```shell
  da delete
  ```

  **步骤示例**：

  - ？请输入要删除的模板名称   cli

- **模板列表**

  ```shell
  da list
  ```

- **初始化项目**

  ```shell
  da init cli test
  ```

  - cli为模板名
  - test为项目名

  **步骤示例**：(本项目地址`https://github.com/lydxwj/da-cli`)

  - ？请输入项目简介  (项目简介) da-cli生成项目test
    - 解释：项目简介是默认值，修改`package.json`中`description`字段

  - ？请输入项目版本  (1.0.0) 0.0.1
    - 解释：1.0.0是默认值，修改`package.json`中`version`字段

  自动下载模板地址`master`分支代码到当前命令行目录下项目名（test）下

- **创建项目**（脚手架规定的项目）

  ```shell
  da create test
  ```

  - test为项目名

  **步骤示例**：

  - ？请选择框架:  vue

    》vue

    - 解释：目前只支持vue

  - ？请输入项目简介  (项目简介) da-cli生成项目test

    - 解释：项目简介是默认值，修改`package.json`中`description`字段

  - ？请输入项目版本  (1.0.0) 0.0.1

    - 解释：1.0.0是默认值，修改`package.json`中`version`字段

- **增加仓库地址类型**（已经内置github，gitlab，gitee）

  ```shell
  da sites add
  ```

  **步骤示例**：（http://192.168.0.0，即http://test.gitlab.com，私有本地仓库）

  - ？请输入仓库地址类型名 test
    - 解释：添加模板时选择模板仓库地址类型列表显示名
  - ？请输入存储仓库地址类型的键（key）test
  - ？请输入仓库地址URL 例如：https://my.sitecode.com  http://192.168.0.0
    - 解释：私有本地仓库建议使用IP地址，否则可能出错

- **删除仓库地址类型**

  ```shell
  da sites delete
  ```

  **步骤示例**：

  - ？请输入要删除的存储仓库地址类型键（key）   test
    - 解释：不支持删除内置github、gitee和gitlab

- **仓库地址类型列表**

  ```shell
  da sites list
  ```

#### 注意

- 支持[github](https://github.com/)、[gitlab](https://gitlab.com/)、[gitee](https://gitee.com/)下的公开项目（私有项目需要自己的git有权限）、公司自己搭建的git仓库的项目
- 下载过程中有可能需要登录对应的git账号

### [项目地址](https://github.com/lydxwj/da-cli)