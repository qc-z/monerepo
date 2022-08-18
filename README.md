### 业务项目发布流是怎么样的？

1. 不同开发者先开发，在提交 PR 时使用 pnpm changeset 写入一份变更集
2. 定期项目 owner 发包，使用 pnpm version-packages 消耗所有变更集，由 changesets 自动提升子包版本、生成 changelog
3. 执行构建命令并发包

### [truberepo](https://turborepo.org/)

Turborepo 是一个为 monorepo 而生的极快的构建系统。目的是为了解决大型 monorepo 项目构建速度缓慢的一大痛点。turbo 的核心是永远不会重新构建已经构建过的内容。turbo 会把每次构建的产物与日志缓存起来，下次构建时只有文件发生变动的部分才会重新构建，没有变动的直接命中缓存并重现日志。turbo 拥有更智能的任务调度程序，充分利用空闲 CPU，使得整体构建速度更快。另外，turbo 还具有远程缓存功能，可以与团队和 CI/CD 共享构建缓存

### 如何 release with tag (like beta version)？

1. 方法一：手动调试法

根据上文我们对 changeset publish 的理解可以得知，每次修改完代码后，手工修改某个包的版本号带上 tag 后进行 tag 发布即可

```js
// package.json
{
    "name": "@scope/some-package",
    "version": "1.0.1-beta.1"
}
```

_注意不要忘记附带 tag 的 option_

`pnpm changeset publish --tag beta`

2. 方法二：整体调试法
   运行命令`pnpm changeset:beta`

之后在此模式下的 changeset publish 均将默认走 beta 环境，下面在此模式下任意的进行你的开发
然后按正常的`pnpm changeset`写入一份变更集

完全调试好后，运行 `pnpm changeset:exit` 退出 prerelease 模式
