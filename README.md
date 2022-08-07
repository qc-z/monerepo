### 业务项目发布流是怎么样的？

1. 不同开发者先开发，在提交 PR 时使用 pnpm changeset 写入一份变更集
2. 定期项目 owner 发包，使用 pnpm version-packages 消耗所有变更集，由 changesets 自动提升子包版本、生成 changelog
3. 执行 pnpm release 构建全部项目并发包

### changeset publish 怎样用好？

1. 实际上，changeset publish 只是一个很纯净的发包命令，他会将所有包都 publish 一次，所以即使不通过 workflow 来提升版本，手动 提升/修改 版本后再 changeset publish 也是可以成功的。

2. 比如你有紧急的测试场景，可以快速手动修改为带 tag 的版本 publish 测试。

[monorepo 工作流基础之 changesets 打开与进阶（Speeches）](https://www.cfanz.cn/mobile/resource/detail/MlLPOGMLwRqqz)
