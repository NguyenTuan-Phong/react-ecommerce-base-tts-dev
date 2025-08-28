import { Link } from 'react-router-dom'
import { dataSecurity } from '../data/dataSecurity'
import '../style/style.css'
const Security = () => {

    return(
        <div className='py-10'>
            <section className="flex gap-3">
                <Link to="/" className="link">TRANG CHỦ</Link>
                <div className="section-text">/</div>
                <span className="cursor-default section-text">CHÍNH SÁCH BẢO MẬT THÔNG TIN KHÁCH HÀNG</span>
            </section>
            <div className='bg-white my-5 rounded-[5px] p-10'>
                <div dangerouslySetInnerHTML={{ __html: dataSecurity }} />
            </div>
        </div>
        
    )
}
export default Security