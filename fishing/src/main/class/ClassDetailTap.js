import React, { useState } from 'react';
import { Link, Element, scroller } from 'react-scroll';
import './scss/ClassDetailTap.scss';
const ClassDetailTap = () => {
  const [activeTab, setActiveTab] = useState('소개');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    scroller.scrollTo(tab, {
      duration: 200,
      smooth: 'easeInOutQuart',
      offset: -150, // 스크롤 위치의 오프셋 (필요에 따라 조정)
    });
  };

  return (
    <div>
      <ul className='detail-tap'>
        <li className={activeTab === '소개' ? 'active' : ''}>
          <Link
            activeClass='active'
            to='소개'
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleTabClick('소개')}
          >
            클래스 소개
          </Link>
        </li>
        <li className={activeTab === '장소' ? 'active' : ''}>
          <Link
            activeClass='active'
            to='장소'
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleTabClick('장소')}
            className='custom-link'
          >
            장소 소개
          </Link>
        </li>
        <li className={activeTab === '후기' ? 'active' : ''}>
          <Link
            activeClass='active'
            to='후기'
            spy={true}
            smooth={true}
            duration={100}
            onClick={() => handleTabClick('후기')}
            className='custom-link'
          >
            수강 후기
          </Link>
        </li>
      </ul>
      <div>
        <Element name='소개'>
          <h2>클래스 소개</h2>
          <p>루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflksj
            dflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdlkjflskdjflksdjfksdjlf루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflksjdflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsd
            lkjflskdjflksdjfksdjlf루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflksjdflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdl
            kjflskdjflksd
            jfksdjlf루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflksjdflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdlkjflskdjflksdjfksdjlf
          </p>
        </Element>
        <br/> <br/> <br/> <br/><br/> <br/> <br/> <br/><br/> <br/> <br/> <br/>
        <Element name='장소'>
          <h2>장소 소개</h2>
          <p>루루라라 사진이랑 글루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflksj
            dflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdlkjflskdjflksdjfksdjlf루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflk
            sjdflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdlkjflskdjflksdjfksdjlf루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflksjdflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdl
            kjflskdjflksdjfksdjlf루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflksjdflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdlkjflskdjflksdjfksdjlf</p>
        </Element>
        <br/> <br/> <br/> <br/><br/> <br/> <br/> <br/><br/> <br/> <br/> <br/>
        <Element name='후기'>
          <h2>수강 후기</h2>
          <p>루루라라 사진이랑 글루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflksjdflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdlkj
            flskdjflksdjfksdjlf루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflksjdflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdlkjflskdjflksdjfksdjlf루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflksjdflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdlkj
            flskdjflksdjfksdjlf루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflksjdflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdlkjflskdjflksdjfksdjlf루루라라 사진이랑 글dskfjdslkfjsd;lkfjdslkfj
            sdfksjdflks
            jdflkjs
            dfkjsdlfkjsldkfjsdlkjfsd
            fkjsdlfkjsdlkjflskdjflksdjfksdjlf</p>
        </Element>
      </div>
    </div>
  );
};

export default ClassDetailTap;