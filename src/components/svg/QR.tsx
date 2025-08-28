/* eslint-disable @typescript-eslint/no-explicit-any */
const QR = (props: any) => (
  <svg
    fill='#000000'
    width='30px'
    height='30px'
    viewBox='0 0 24 24'
    id='qr-code'
    data-name='Line Color'
    xmlns='http://www.w3.org/2000/svg'
    className='icon line-color'
    {...props}
  >
    <rect
      id='secondary'
      x={14}
      y={14}
      width={3}
      height={3}
      style={{
        fill: 'none',
        stroke: 'rgb(44, 169, 188)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
    <path
      id='secondary-2'
      data-name='secondary'
      d='M21,14v5a2,2,0,0,1-2,2H14'
      style={{
        fill: 'none',
        stroke: 'rgb(44, 169, 188)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
    <path
      id='primary'
      d='M9,10H4A1,1,0,0,1,3,9V4A1,1,0,0,1,4,3H9a1,1,0,0,1,1,1V9A1,1,0,0,1,9,10ZM21,9V4a1,1,0,0,0-1-1H15a1,1,0,0,0-1,1V9a1,1,0,0,0,1,1h5A1,1,0,0,0,21,9ZM10,20V15a1,1,0,0,0-1-1H4a1,1,0,0,0-1,1v5a1,1,0,0,0,1,1H9A1,1,0,0,0,10,20Z'
      style={{
        fill: 'none',
        stroke: 'rgb(0, 0, 0)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
  </svg>
);
export default QR;
