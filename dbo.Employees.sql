USE [EmployeeDB]
GO

/****** Object:  Table [dbo].[Employees]    Script Date: 4/29/2020 5:28:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Employees](
	[EmployeeID] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeName] [varchar](1000) NULL,
	[Department] [varchar](1000) NULL,
	[MailID] [varchar](1000) NULL,
	[DOJ] [date] NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

