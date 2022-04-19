import { ICategory } from '../interfaces';

export const categories: ICategory[] = [
  // cat-1
  {
    id: 'category-id-1',
    columnId: 'column-id-1',
    title: 'NuORDER reports',
    // @ts-ignore
    createdAt: '2021-10-01T13:13:45.115Z',
    links: [
      {
        id: 'link-1',
        title: 'NuORDER Roadmap',
        href: 'https://docs.google.com/spreadsheets/d/1n9WAYwY7ZZzBtmRESmo56cnr_stoD91RZF3MWsuT-jM/edit#gid=896691038',
        // @ts-ignore
        createdAt: '2021-10-01T13:13:45.115Z',
      },
      {
        id: 'link-2',
        title: 'Promotions UI Roadmap',
        href: 'https://docs.google.com/spreadsheets/d/1DBs3ba5CmwnjToO9quQcfymGDL6npSOEy2ORfzcottw/edit#gid=1058968297',
        // @ts-ignore
        createdAt: '2021-10-01T13:13:45.115Z',
      },
      {
        id: 'link-3',
        title: 'Hanes and BlackDiamonds UI Roadmap',
        href: 'https://docs.google.com/spreadsheets/d/1zJ1VQRKtc6PqJstGQ48i-EeE8G4XoU69PoIxaIyEIao/edit#gid=1058968297',
        // @ts-ignore
        createdAt: '2021-10-01T13:13:45.115Z',
      },
    ],
  },
  // cat-2
  {
    id: 'category-id-2',
    columnId: 'column-id-1',
    title: 'Weekly Reporting',
    // @ts-ignore
    createdAt: '2021-10-01T13:13:45.115Z',
    links: [
      {
        id: 'link-4',
        title: 'Update: Velocity',
        href: 'https://docs.google.com/spreadsheets/d/1x_S2AgTQTz5MRFseuZtM65HEPbDxMY-VT3eP5bglIB4/edit#gid=799765779',
        // @ts-ignore
        createdAt: '2021-10-01T13:13:45.115Z',
      },
    ],
  },
  // cat-3
  {
    id: 'category-id-3',
    columnId: 'column-id-2',
    title: 'Money',
    // @ts-ignore
    createdAt: '2021-10-01T13:13:45.115Z',
    links: [
      {
        id: 'link-5',
        title: 'SRP',
        href: 'https://docs.google.com/spreadsheets/d/1p1ueRjmC12Nbqa-4_ImnndMdtpPxiW0UrPxBOraZy3Y/edit?ts=602d6b30#gid=663492130',
        // @ts-ignore
        createdAt: '2021-10-01T13:13:45.115Z',
      },
      {
        id: 'link-6',
        title: 'Financial KPI',
        href: 'https://docs.google.com/spreadsheets/d/1Ru-TmgnuNRntR3pYDMkGnbhdAt-hPcLm0xvOAZbjDw8/edit#gid=2102512424',
        // @ts-ignore
        createdAt: '2021-10-01T13:13:45.115Z',
      },
      {
        id: 'link-7',
        title: 'SOW / MAS',
        href: 'https://griddynamics.app.box.com/folder/131072051862?utm_campaign=collab%20auto%20accept%20user&utm_medium=email&utm_source=trans',
        // @ts-ignore
        createdAt: '2021-10-01T13:13:45.115Z',
      },
    ],
  },
];
