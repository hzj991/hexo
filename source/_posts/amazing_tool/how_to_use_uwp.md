---
title: '如何使用uwp制作一个视频播放器(How to use uwp to make a video player)'
date: '2020-01-09T07:16:46+08:00'
tags:
    - uwp
    - 'c#'
categories:
    - HowToUse
---

<!-- TOC -->

- [UWP-001:什么是通用 Windows 平台 (UWP) 应用？](#uwp-001什么是通用-windows-平台-uwp-应用)
- [UWP-002:开发目的+起步](#uwp-002开发目的起步)
  - [开发原因](#开发原因)
  - [起步](#起步)
- [使用grid，并在左上添加一段文字](#使用grid并在左上添加一段文字)
  - [使用listView绑定数据渲染](#使用listview绑定数据渲染)
- [UWP-003:视频组件和创建自定义传输控件](#uwp-003视频组件和创建自定义传输控件)
- [UWP-004:事件和sqlite的引用](#uwp-004事件和sqlite的引用)

<!-- /TOC -->


# UWP-001:什么是通用 Windows 平台 (UWP) 应用？

UWP 应用的特点：
- 安全：UWP 应用声明其访问哪些设备资源和数据 用户必须对该访问授权。
- 能够在运行 Windows 10 的所有设备上使用常见的 API。
- 可以使用设备的特定功能并让 UI 适应不同的设备屏幕尺寸、分辨率和 DPI。
- 通过运行 Windows 10 的所有设备（或只是你指定的设备）上的 Microsoft Store 提供。 Microsoft Store 提供了多种利你的应用赚钱的方式。
- 能够在不对计算机构成风险或引起“计算机腐烂”的情况下安装和卸载。
- 互动：使用动态磁贴、推送通知以及与 Windows 时间线和 Cortana 的“Pick Up Where I Left Off”交互的用户活动吸引用户。
- 可使用 C#、C++、Visual Basic 和 Javascript 编程。 对于 UI，使用 XAML、HTML 或 DirectX。


<!--more-->

[什么是通用 Windows 平台 (UWP) 应用？](https://docs.microsoft.com/zh-cn/windows/uwp/get-started/universal-application-platform-guide)


# UWP-002:开发目的+起步

## 开发原因

由于暴风gg了，win10 win store里面也没有觉得很好的播放器，而各大互联网厂商的播放器主要目的不是播放本地文件，win10自带的播放器又过分简陋，所以打算开发一个基于uwp的播放器，选择这个的原因呢通过有以下几点

q:为什么不选择可跨平台的一些开发方案?
a:跨平台成本高，并且主要用win本子，跨平台的一些虽然看着美好，实际上个人开发只会关注一个平台
q:为什么选择开发uwp？
a:因为uwp可以发布在商店，相比于传统的exe更安全，分发途径比较好，小众软件商店下载比较好一点
q:有啥不好的地方吗？
a:微软开发者账号注册不能用微信支付宝银行卡，，，有点费劲啊，这整的

目的：
开发一个简洁的播放器，方便调节倍速就好

## 起步

开发环境使用的是vs2019，安装uwp开发相关的选项，

<!--more-->


*本文比较糙，如作参考，切勿钻牛角尖音响效率*

[simpleM's GitHub](https://github.com/hzjoyous/SimpleM)


uwp 里其实和 web网页开发类似， xaml、cs文件与html、css、js等算是也有对应关系，同时uwp中grid的布局方式我使用起来比较顺手，所以起步还是比较方便的



# 使用grid，并在左上添加一段文字

简单布局,在MainPage.xaml中添加一个2*2的布局,并在左上的格子添加一段文字

```xaml
<Grid.ColumnDefinitions>
    <ColumnDefinition Width="7*"/>
    <ColumnDefinition Width="3*"/>
</Grid.ColumnDefinitions>

<Grid.RowDefinitions>
    <RowDefinition Height="auto"/>
    <RowDefinition Height="9.5*"/>
</Grid.RowDefinitions>

<Grid Grid.Row="0"  Grid.Column="0">
<TextBlock Text="提示" FontSize="20" FontWeight="Medium" />
</Gird>

```



## 使用listView绑定数据渲染

```xaml
<Grid Grid.Row="0">
    <ListView Name="MItems" ItemsSource="{x:Bind VideoFileInfoList}" ItemClick="MItems_ItemClick"  IsItemClickEnabled="True">
        <ListView.ItemTemplate>
            <DataTemplate>
                <TextBlock Text="{Binding FilePath}"/>
            </DataTemplate>
        </ListView.ItemTemplate>
    </ListView>
</Grid>
```

```cs
public sealed partial class MainPage : Page
{

   public ObservableCollection<VideoFileInfoData> VideoFileInfoList = new ObservableCollection<VideoFileInfoData>();

    /* ... */
}
```

# UWP-003:视频组件和创建自定义传输控件



*本文比较糙，如作参考，切勿钻牛角尖音响效率*

[simpleM'sGitHub](https://github.com/hzjoyous/SimpleM)

uwp 视频播放器元素类 `MediaPlayerElement`


简单引入并播放

```xaml
<MediaPlayerElement Source="ms-appx:///Media/video1.mp4" AutoPlay="True" />
```

<!--more-->

[创建自定义传输控件](https://docs.microsoft.com/zh-cn/windows/uwp/design/controls-and-patterns/custom-transport-controls)



- 从windows (Program Files)\Windows Kits\10\DesignTime\CommonConfiguration\Neutral\UAP\(SDK version)\Generic 中的xaml复制需要的空间默认样式至项目中的Themes\generic.xaml ,如没有自行创建

更改
```
<Style TargetType="local:自定义控件名称名字">

<ControlTemplate TargetType="local:自定义控件名称名字">
```

创建新类
自定义控件名称名字.cs并在构造函数中引用自定义的配置
```cs

    public sealed class SuperSimpleMediaTransportControls : MediaTransportControls
    {

        public SuperSimpleMediaTransportControls()
        {
            // 我定义的空间名称为SuperSimpleMediaTransportControls
            this.DefaultStyleKey = typeof(SuperSimpleMediaTransportControls);
        }
```


# UWP-004:事件和sqlite的引用



 
*本文比较糙，如作参考，切勿钻牛角尖音响效率*

[simpleM's GitHub](https://github.com/hzjoyous/SimpleM)

```xaml
<Grid Grid.Row="1" >
    <Grid>
        <MediaPlayerElement  Grid.Row="1" Grid.Column="0" Name="mediaPlayer" AutoPlay="True" Visibility="Visible" AreTransportControlsEnabled="True">
            <MediaPlayerElement.TransportControls>
                <local:SuperSimpleMediaTransportControls IsCompact="True"
                                        IsZoomButtonVisible="True"
                                        IsZoomEnabled="True"
                                        IsPlaybackRateButtonVisible="True"
                                        IsPlaybackRateEnabled="True"
                                        AddPlaybackRated="SuperSimpleMediaTransportControls_AddPlaybackRated"
                                        InitPlaybackRated="SuperSimpleMediaTransportControls_InitPlaybackRated"
                                        ReducePlaybackRated="SuperSimpleMediaTransportControls_ReducePlaybackRated"
                                        >
                </local:SuperSimpleMediaTransportControls>
            </MediaPlayerElement.TransportControls>

        </MediaPlayerElement>
        
    </Grid>
</Grid>

```

```cs
private void SuperSimpleMediaTransportControls_ReducePlaybackRated(object sender, EventArgs e)
{
    mediaPlayer.MediaPlayer.PlaybackSession.PlaybackRate -= 0.1;
    UpShowText("当前播放速度为：" + mediaPlayer.MediaPlayer.PlaybackSession.PlaybackRate);

}
```



[在 UWP 应用中使用 SQLite 数据库](https://docs.microsoft.com/zh-cn/windows/uwp/data-access/sqlite-databases)

官方数据库示例貌似有缺陷，在我的版本不能正常运行，最下方也有人提出相同问题，并且官方数据库的使用范例为先写一个lib，然后引入lib，目前所写的播放器并用不到这种分离，就在simpleM项目中直接进行sqlite的引用