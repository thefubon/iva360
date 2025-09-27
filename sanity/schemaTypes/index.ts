import page from '../schemas/page'
import post from '../schemas/post'
import author from '../schemas/author'
import category from '../schemas/category'
import blockContent from '../schemas/blockContent'

// Кастомные блоки
import pageBlocks from '../schemas/pageBlocks'
import textBlock from '../schemas/blocks/textBlock'
import cardBlock from '../schemas/blocks/cardBlock'
import bannerBlock from '../schemas/blocks/bannerBlock'

export const schemaTypes = [
  page, 
  post, 
  author, 
  category, 
  blockContent, 
  pageBlocks,
  textBlock,
  cardBlock,
  bannerBlock
]
