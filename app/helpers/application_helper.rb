module ApplicationHelper
  def fat_adder
    "<input type='hidden'
            name='authenticity_token'
            value='#{ form_authenticity_token }'>".html_safe
  end
  
  def markdownToHtml(markdown)
    renderer = Redcarpet::Render::HTML.new()
    markdown_parser = Redcarpet::Markdown.new(renderer)
    
    markdown_parser.render(markdown).html_safe
  end
end
