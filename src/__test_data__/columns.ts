import { IColumn } from '../interfaces';

export const columns: IColumn[] = [
  // col-1
  {
    id: 'column-1',
    tabId: 'tab-id-1',
    categories: [
      // cat-1
      {
        id: 'cat-1',
        title: 'NuORDER reports',
        links: [
          {
            id: 'link-1',
            title: 'NuORDER Roadmap',
            href: 'https://docs.google.com/spreadsheets/d/1n9WAYwY7ZZzBtmRESmo56cnr_stoD91RZF3MWsuT-jM/edit#gid=896691038',
          },
          {
            id: 'link-2',
            title: 'Promotions UI Roadmap',
            href: 'https://docs.google.com/spreadsheets/d/1DBs3ba5CmwnjToO9quQcfymGDL6npSOEy2ORfzcottw/edit#gid=1058968297',
          },
          {
            id: 'link-3',
            title: 'Hanes and BlackDiamonds UI Roadmap',
            href: 'https://docs.google.com/spreadsheets/d/1zJ1VQRKtc6PqJstGQ48i-EeE8G4XoU69PoIxaIyEIao/edit#gid=1058968297',
          },
        ],
      },
      // cat-2
      {
        id: 'cat-2',
        title: 'Weekly Reporting',
        links: [
          {
            id: 'link-1',
            title: 'Update: Velocity',
            href: 'https://docs.google.com/spreadsheets/d/1x_S2AgTQTz5MRFseuZtM65HEPbDxMY-VT3eP5bglIB4/edit#gid=799765779',
          },
        ],
      },
    ],
  },
  // col - 2
  {
    id: 'column-2',
    tabId: 'tab-id-1',
    categories: [
      // cat-1
      {
        id: 'cat-1',
        title: 'Money',
        links: [
          {
            id: 'link-1',
            title: 'SRP',
            href: 'https://docs.google.com/spreadsheets/d/1p1ueRjmC12Nbqa-4_ImnndMdtpPxiW0UrPxBOraZy3Y/edit?ts=602d6b30#gid=663492130',
          },
          {
            id: 'link-2',
            title: 'Financial KPI',
            href: 'https://docs.google.com/spreadsheets/d/1Ru-TmgnuNRntR3pYDMkGnbhdAt-hPcLm0xvOAZbjDw8/edit#gid=2102512424',
          },
          {
            id: 'link-3',
            title: 'SOW / MAS',
            href: 'https://griddynamics.app.box.com/folder/131072051862?utm_campaign=collab%20auto%20accept%20user&utm_medium=email&utm_source=trans',
          },
        ],
      },
    ],
  },
];
