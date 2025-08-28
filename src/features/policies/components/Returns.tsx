import { Link } from 'react-router-dom'
import { dataReturns } from '../data/dataReturns'
import '../style/style.css'
const Returns = () => {

    return(
        <div className='py-10'>
            <section className="flex gap-3">
                <Link to="/" className="link">TRANG CHỦ</Link>
                <div className="section-text">/</div>
                <span className="cursor-default section-text">CHÍNH SÁCH ĐỔI TRẢ VÀ HOÀN TIỀN</span>
            </section>
            <div className='bg-white my-5 rounded-[5px] p-10'>
                <div dangerouslySetInnerHTML={{ __html: dataReturns }} />
            </div>
        </div>
        
    )
}
export default Returns