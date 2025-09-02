import AvatarIcon from '~/shared/icons/ProfileIcons/AvatarIcon';
import DocumentIcon from '~/shared/icons/ProfileIcons/DocumentIcon';
import QuestionIcon from '~/shared/icons/ProfileIcons/QuestionIcon';

export const menuSections = [
  {
    title: 'GENERAL',
    items: [
      {
        id: 'identity',
        title: 'Identity verification',
        icon: <AvatarIcon />,
      },
    ],
  },
  {
    title: 'BFINANCE',
    items: [
      {
        id: 'support',
        title: 'Support',
        icon: <QuestionIcon />,
      },
    ],
  },
  {
    title: 'LEGAL',
    items: [
      {
        id: 'privacy',
        title: 'Privacy Policy',
        icon: <DocumentIcon />,
      },
      {
        id: 'terms',
        title: 'Terms of Use',
        icon: <DocumentIcon />,
      },
      {
        id: 'aml',
        title: 'AML Policy',
        icon: <DocumentIcon />,
      },
    ],
  },
];
