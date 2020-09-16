import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined'
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined'
import BubbleChartOutlinedIcon from '@material-ui/icons/BubbleChartOutlined'
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined'

export const SEARCH_PLACEHOLDER = 'e.g. Grammar, Vocabulary, Language'

export const WELCOME_CONTENT = [
  'Your one-stop platform for english teaching resources',
  'Get access to hundreds of english teaching resources',
  'Easily create lesson plans to cater to your teaching needs',
]

export const MOCK_LESSONS = [
  {
    title: 'Reading Comprehension - Rocks From Space',
    image: '/home/mock.png',
    slug: 'mock-slug',
  },
  {
    title: 'Reading Comprehension - Rocks From Space',
    image: '/home/mock.png',
    slug: 'mock-slug',
  },
  {
    title: 'Reading Comprehension - Rocks From Space',
    image: '/home/mock.png',
    slug: 'mock-slug',
  },
]

export const ALL_TIME_POPULAR_LESSONS = {
  title: 'All-Time Most Popular Lessons',
  link: '/lessons',
}
export const POPULAR_GRAMMAR_LESSONS = {
  title: 'Most Popular Grammar Lessons',
  link: '/lessons',
}

export const SIDEBAR_ITEMS = [
  {
    icon: FlagOutlinedIcon,
    title: 'Getting Started',
    link: '/',
  },
  {
    icon: ReceiptOutlinedIcon,
    title: 'About EnglishSmith',
    link: '/about',
  },
]

export const TOPIC_LIST_ITEMS = [
  {
    icon: BubbleChartOutlinedIcon,
    title: 'Grammar',
    link: '/',
  },
  {
    icon: NoteOutlinedIcon,
    title: 'Vocabulary',
    link: '/',
  },
  {
    icon: BookOutlinedIcon,
    title: 'Reading',
    link: '/',
  },
]
