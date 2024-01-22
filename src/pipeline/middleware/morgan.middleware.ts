import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import { WinstonService } from '@/client/logger/winston/winston.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private logger: WinstonService) {}

  use(req: any, res: any, next: (error?: any) => void): any {
    this.getRequestIp();

    morgan(this.getFormat(), {
      stream: {
        write: (message: string) =>
          this.logger.http(message.substring(0, message.lastIndexOf('\n'))),
      },
    })(req, res, next);
  }

  private getRequestIp() {
    morgan.token('remote-addr', (req) => {
      // req.headers['x-forwarded-for']는 ip를 여러개 가지고 있을 수 있음
      // 프록시나 로드밸런서를 거칠 경우 요청을 보낸 [클라이언트ip, 프록시1, 프록시2, ...] 형태로 저장돔
      const requestIpList = req.headers['x-forwarded-for'];
      let ip: string | undefined;

      // 첫번째 ip를 가져옴으로써 가장 처음 요청을 보낸 클라이언트 ip를 가져옴
      if (Array.isArray(requestIpList) && requestIpList.length > 0) {
        ip = requestIpList[0];
      } else if (typeof requestIpList === 'string') {
        ip = requestIpList.split(',')[0];
      }

      ip = ip || req.socket.remoteAddress;

      // ipv4가 ipv6로 표현되었을 경우 ipv4로 변환
      const ipv4Match = ip?.match(/(?::ffff:)?(\d+\.\d+\.\d+\.\d+)/);
      return ipv4Match ? ipv4Match[1] : ip;
    });
  }

  private getFormat() {
    if (process.env.NODE_ENV === 'development') {
      return 'dev'; // :method :url :status :response-time ms - :res[content-length]
    }

    return ':method :url :status - :response-time ms [:remote-addr - :user-agent]';
  }
}
