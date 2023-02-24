import { BsShareFill, BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import {IoMdShareAlt} from 'react-icons/io';

const ShareButton = (props) => {

  const { id } = props;

  var sharelink = window.location.href;

  return (
    <div
        className="share"
      >
        <span><IoMdShareAlt/>Delen</span>
        <nav>
          <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=`+sharelink} ><BsTwitter alt='Share met Twitter' /></a>
          <a href={sharelink}> <BsFacebook alt='Share met Facebook'/></a>
          <a href={sharelink}><BsLinkedin alt='Share met LinkedIn'/></a>
          <a href={sharelink}><BsWhatsapp alt='Share met Whatsapp' /></a>
        </nav>

    </div>
  );

};

export default ShareButton;