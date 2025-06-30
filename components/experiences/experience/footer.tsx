const Footer = () =>
  import('@/components/shared/footer').then((component) => (
    <div className={'w-full'}>
      <component.default />
    </div>
  ))

export default Footer
