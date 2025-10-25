const InterMap = () => {
  const address = "​Волгино ​25 лет Октября, 1 ст194 Советский район, Волгоград, 400119 1 этаж"
  const coordinates = "44.465725,48.670890"

   return (
    <div style={{ 
      height: '400px', 
      width: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '2px solid #d4af37'
    }}>
      <iframe
        title="Карта расположения магазина"
        src={`https://yandex.ru/map-widget/v1/?ll=${coordinates}&z=15&pt=${coordinates},pm2dgl`}
        width="100%"
        height="100%"

        style={{ border: 'none' }}
        allowFullScreen
      />
    </div>
  )
}
export default InterMap